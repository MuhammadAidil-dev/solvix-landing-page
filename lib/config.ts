export function getApiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "";
  return base.replace(/\/$/, "");
}

export const REQUEST_TIMEOUT_MS = 10_000;
