"use client";

import { create } from "zustand";

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
}

// Token access hanya di memory (Zustand). Refresh via httpOnly cookie. Tanpa localStorage.
interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  status: AuthStatus;
  error: string | null;
  setSession: (session: { user: AuthUser | null; accessToken: string | null }) => void;
  setError: (message: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
  setSession: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      status: accessToken ? "authenticated" : "unauthenticated",
      error: null,
    }),
  setError: (message) => set({ error: message }),
  logout: () =>
    set({ user: null, accessToken: null, status: "unauthenticated", error: null }),
}));
