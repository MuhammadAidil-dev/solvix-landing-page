"use client";

import { create } from "zustand";
import { ApiError } from "../../../lib/api-error";
import { useAuthStore } from "../../../stores/auth";
import { loginApi } from "../service/api";
import type { LoginInput } from "../schema/schema";

interface LoginState {
  loading: boolean;
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
}

// Store per-feature untuk form login; session global tetap di stores/auth.
export const useLoginStore = create<LoginState>((set) => ({
  loading: false,
  error: null,
  login: async (input) => {
    set({ loading: true, error: null });
    try {
      const { accessToken, user } = await loginApi(input);
      useAuthStore.getState().setSession({ accessToken, user });
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Login gagal";
      set({ error: message });
      useAuthStore.getState().setError(message);
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));