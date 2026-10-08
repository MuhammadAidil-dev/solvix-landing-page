# solvix-landing

Feature-based: `app/`, `features/<fitur>/`, `components/ui/`, `lib/`, `stores/`.

## Scripts

- `npm run dev` / `build` / `start` / `test` / `typecheck`

## Env

Copy `.env.example` → `.env.development` / `.env.production`. Wajib `NEXT_PUBLIC_API_URL`.

## Auth

Access token hanya di memory Zustand. Refresh via httpOnly cookie `/auth/refresh`. Tanpa localStorage.
