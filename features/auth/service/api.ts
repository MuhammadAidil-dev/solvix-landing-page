import { apiPublic } from "../../../lib/fetcher";
import type { AuthUser } from "../../../stores/auth";
import type { LoginInput } from "../schema/schema";

interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export function loginApi(input: LoginInput): Promise<LoginResponse> {
  return apiPublic<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}