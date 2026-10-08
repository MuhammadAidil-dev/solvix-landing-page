import { ApiError } from "./api-error";
import { REQUEST_TIMEOUT_MS, getApiBaseUrl } from "./config";
import { useAuthStore } from "../stores/auth";

export interface RequestOptions extends RequestInit {
  baseUrl?: string;
  timeoutMs?: number;
  token?: string | null;
}

interface BackendEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  error?: { code?: string; details?: unknown };
}

function joinUrl(base: string, path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const b = base.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function redirectToLogin(): void {
  if (typeof window === "undefined") return;
  if (typeof process !== "undefined" && process.env?.VITEST) return;
  try {
    window.location.href = "/login";
  } catch {
    // abaikan (mis. jsdom saat test)
  }
}

async function parseJsonSafe(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** Satu pintu request: timeout Abort 10s, parse aman, mapping ApiError, paham kontrak backend. */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { baseUrl, timeoutMs = REQUEST_TIMEOUT_MS, token, ...init } = options;
  const base = (baseUrl ?? getApiBaseUrl()).replace(/\/$/, "");
  const url = joinUrl(base, path);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (init.headers) {
    new Headers(init.headers).forEach((v, k) => {
      headers[k] = v;
    });
  }
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(url, { ...init, headers, signal: controller.signal });
    const body = (await parseJsonSafe(res)) as BackendEnvelope<T> | null;

    if (body !== null && typeof body === "object" && "success" in body) {
      if (body.success) return body.data as T;
      throw new ApiError({
        status: res.status,
        code: body.error?.code ?? `HTTP_${res.status}`,
        message: body.message || "Request gagal",
        details: body.error?.details,
        raw: body,
      });
    }

    if (!res.ok) {
      throw new ApiError({
        status: res.status,
        code: `HTTP_${res.status}`,
        message: `Request gagal (${res.status})`,
        raw: body,
      });
    }
    return body as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError({ status: 0, code: "TIMEOUT", message: "Request timeout (10s)" });
    }
    throw new ApiError({
      status: 0,
      code: "NETWORK_ERROR",
      message: err instanceof Error ? err.message : "Network error",
      raw: err,
    });
  } finally {
    clearTimeout(timer);
  }
}

/** Tanpa token — login/register/public listing. */
export function apiPublic<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return request<T>(path, options);
}

async function tryRefresh(base: string): Promise<{ accessToken: string; user: unknown } | null> {
  try {
    const res = await fetch(joinUrl(base, "/auth/refresh"), {
      method: "POST",
      credentials: "include",
    });
    const body = (await parseJsonSafe(res)) as BackendEnvelope<{
      accessToken: string;
      user: { id: string };
    }> | null;
    if (body && typeof body === "object" && "success" in body && body.success) {
      return body.data as { accessToken: string; user: unknown };
    }
    return null;
  } catch {
    return null;
  }
}

/** Dengan Bearer dari Zustand memory. 401 → refresh sekali → retry 1x → gagal logout + redirect /login. */
export async function apiAuth<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { baseUrl, ...rest } = options;
  const base = (baseUrl ?? getApiBaseUrl()).replace(/\/$/, "");
  const token = options.token ?? useAuthStore.getState().accessToken;

  try {
    return await request<T>(path, { ...rest, baseUrl: base, token });
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 401) throw err;

    const refreshed = await tryRefresh(base);
    if (!refreshed) {
      useAuthStore.getState().logout();
      redirectToLogin();
      throw err;
    }

    useAuthStore.getState().setSession({
      accessToken: refreshed.accessToken,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: refreshed.user as any,
    });
    return request<T>(path, { ...rest, baseUrl: base, token: refreshed.accessToken });
  }
}

export interface ServerRequestOptions extends RequestOptions {
  token?: string | null;
}

/** Varian server (Server Components / error boundary): tanpa window redirect, tanpa auto-refresh. */
export function apiServer<T>(path: string, options: ServerRequestOptions = {}): Promise<T> {
  return request<T>(path, options);
}
