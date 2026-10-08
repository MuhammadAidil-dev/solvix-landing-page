import { beforeEach, describe, expect, test, vi } from "vitest";
import { ApiError } from "../api-error";
import { apiAuth, apiPublic, request } from "../fetcher";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("request() core mapping", () => {
  test("returns data when backend success:true", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ success: true, message: "ok", data: { id: 1 } })
      )
    );

    const data = await request<{ id: number }>("/health", { baseUrl: "https://api.test" });

    expect(data).toEqual({ id: 1 });
  });

  test("throws ApiError mapping success:false (code/details preserved)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse(
          {
            success: false,
            message: "Email sudah terdaftar",
            data: null,
            error: { code: "EMAIL_EXISTS", details: { email: "a@b.co" } },
          },
          409
        )
      )
    );

    const err = (await request("/users", { baseUrl: "https://api.test" }).catch(
      (e) => e
    )) as ApiError;

    expect(err).toBeInstanceOf(ApiError);
    expect(err.status).toBe(409);
    expect(err.code).toBe("EMAIL_EXISTS");
    expect(err.message).toBe("Email sudah terdaftar");
    expect(err.details).toEqual({ email: "a@b.co" });
  });

  test("throws ApiError NETWORK_ERROR when fetch rejects (network error)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("fetch failed");
      })
    );

    const err = (await request("/health", { baseUrl: "https://api.test" }).catch(
      (e) => e
    )) as ApiError;

    expect(err).toBeInstanceOf(ApiError);
    expect(err.status).toBe(0);
    expect(err.code).toBe("NETWORK_ERROR");
  });
});

describe("apiPublic()", () => {
  test("calls without Authorization header", async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ success: true, message: "ok", data: [] })
    );
    vi.stubGlobal("fetch", fetchMock);

    await apiPublic("/products", { baseUrl: "https://api.test" });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(init?.headers).not.toMatchObject({ Authorization: expect.anything() });
  });
});

describe("apiAuth() 401 refresh-once flow", () => {
  test("retries once after /auth/refresh then returns data", async () => {
    const { useAuthStore } = await import("../../stores/auth");
    useAuthStore.setState({ accessToken: "expired-token", user: null, status: "authenticated", error: null });

    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (String(url).endsWith("/auth/refresh")) {
        return jsonResponse({
          success: true,
          message: "ok",
          data: { accessToken: "new-token", user: { id: "1" } },
        });
      }
      const auth = (init?.headers as Record<string, string>)?.["Authorization"];
      if (auth === "Bearer expired-token") {
        return jsonResponse(
          { success: false, message: "Unauthorized", data: null, error: { code: "UNAUTHORIZED" } },
          401
        );
      }
      return jsonResponse({ success: true, message: "ok", data: { id: 1 } });
    });
    vi.stubGlobal("fetch", fetchMock);

    const data = await apiAuth<{ id: number }>("/me", { baseUrl: "https://api.test" });

    expect(data).toEqual({ id: 1 });
    expect(useAuthStore.getState().accessToken).toBe("new-token");
    // 1 gagal + 1 refresh + 1 retry
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  test("logout + throw UNAUTHORIZED when refresh fails", async () => {
    const { useAuthStore } = await import("../../stores/auth");
    useAuthStore.setState({ accessToken: "expired-token", user: null, status: "authenticated", error: null });

    const fetchMock = vi.fn(async (url: string) => {
      if (String(url).endsWith("/auth/refresh")) {
        return jsonResponse(
          { success: false, message: "Unauthorized", data: null, error: { code: "UNAUTHORIZED" } },
          401
        );
      }
      return jsonResponse(
        { success: false, message: "Unauthorized", data: null, error: { code: "UNAUTHORIZED" } },
        401
      );
    });
    vi.stubGlobal("fetch", fetchMock);

    const err = (await apiAuth("/me", { baseUrl: "https://api.test" }).catch(
      (e) => e
    )) as ApiError;

    expect(err).toBeInstanceOf(ApiError);
    expect(err.status).toBe(401);
    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(useAuthStore.getState().status).toBe("unauthenticated");
  });
});
