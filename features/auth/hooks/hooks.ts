"use client";

import { useRouter } from "next/navigation";
import { useLoginStore } from "../store/store";
import type { LoginInput } from "../schema/schema";

// Hook tipis: return { login, loading, error }. Komponen hanya konsumsi hook.
export function useLogin() {
  const router = useRouter();
  const loading = useLoginStore((s) => s.loading);
  const error = useLoginStore((s) => s.error);
  const loginStore = useLoginStore((s) => s.login);

  const login = async (input: LoginInput) => {
    await loginStore(input);
    router.push("/");
  };

  return { login, loading, error };
}