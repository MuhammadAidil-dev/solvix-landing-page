# AGENTS.md

Next.js 14 App Router + TypeScript + Tailwind + Zustand frontend template. Single package, no monorepo, no CI, no git repo initialized yet.

## Baseline: known-broken commands

Verified on Node 22.11 / npm. Fix these before assuming you broke something.

- **`dev`, `build`, `start`, `lint` all fail immediately.** `next.config.mjs` contains TypeScript (`import type { NextConfig } from "next"`), but Next loads `.mjs` config as plain JS with no transpile → `SyntaxError: Unexpected token '{'`. Fix: drop the type-only import (use the `postcss.config.mjs` JSDoc `@type` pattern instead, or rename to `next.config.ts`).
- **`typecheck` has 4 pre-existing errors.** Wrong relative depth in two components — `../hooks/hooks` and `../schema/schema` are used from `features/*/components/{form,table}/`, so they must be `../../hooks/hooks` and `../../schema/schema`:
  - `features/auth/components/form/LoginForm.tsx:7,8`
  - `features/product/components/table/ProductList.tsx:4` (plus a cascading implicit-`any` on `p` at line 15)
- **`test` is the only fully green command** (`lib/__tests__/fetcher.test.ts`, 6 tests). Use it as the real regression gate until the above are fixed.
- `next-env.d.ts` and `.next/` do not exist on disk (gitignored, and `next dev`/`build` never ran), so `tsconfig`'s `include` of `next-env.d.ts` resolves to nothing. Harmless.

## Commands

```
npm run dev         # BROKEN (see above)
npm run typecheck   # tsc --noEmit
npm test            # vitest run — the only passing gate
npm run test:watch
npm run lint        # BROKEN (see above)
npm run build       # BROKEN (see above)
```

- No `format` script. Prettier must be run manually: `npx prettier --write .` (config: semi, double quotes, trailingComma `es5`, printWidth 100).
- Run a single test file: `npx vitest run lib/__tests__/fetcher.test.ts`; single test by name: `npx vitest run -t "refresh-once"`.
- Use `workdir` rather than `cd` in this repo — the absolute path contains spaces (`TOP SOLVIX LABS PROJECT`), which breaks naive `cd` + npm invocations.

## Layout and boundaries

```
app/            Next App Router pages + layout/error/loading + globals.css (Tailwind directives only)
components/ui/  Presentational primitives: Button, Input, Toast
features/<f>/   Per-feature vertical slice — components/, hooks/, schema/, service/, store/
lib/            Cross-cutting: fetcher.ts, api-error.ts, config.ts, utils.ts
stores/         Global cross-feature stores only (currently just auth session)
middleware.ts   Route guard
```

Feature slice convention (all four layers required, named exactly this way):

- `service/api.ts` — the only place that calls `lib/fetcher`. Components/hooks never call `fetch` directly.
- `schema/schema.ts` — Zod schema + inferred type. Types are `z.infer`; never hand-write the type.
- `store/store.ts` — **local UI state** for that feature (`loading`, `error`, actions). `"use client"`.
- `hooks/hooks.ts` — thin wrapper; components consume hooks only, never the feature store.
- `components/` — UI only.

Store split is deliberate: `stores/auth.ts` holds the global session; `features/*/store/` hold per-screen UI state. Don't duplicate session state into a feature store — feature stores read/write the global one via `useAuthStore.getState()`.

## HTTP layer (`lib/fetcher.ts`)

Single gateway for all requests. Non-obvious contracts:

- Backend always returns an envelope `{ success, message, data, error? }`. `request()` **auto-unwraps** it — callers get `data` directly, never the envelope. Don't hand-check `res.ok` or `body.success`.
- Failures are always `ApiError` (`status`, `code`, `details`, `raw`), never raw `Error`/`TypeError`. Branch on `err.status` / `err.code`.
- 10s AbortController timeout, always. Errors collapse to `status: 0` with code `TIMEOUT` or `NETWORK_ERROR`.
- Three entrypoints: `apiPublic` (no token), `apiAuth` (Bearer + refresh-once + retry), `apiServer` (no window access, no refresh). Pick by execution context.
- `apiAuth` on 401 calls `POST {base}/auth/refresh` **once**, retries the request once, and on failure does `logout()` + hard `window.location.href = "/login"`. Never call `apiAuth` from a Server Component.

## Auth model (do not "fix" this)

- Access token lives **only in Zustand memory** (`stores/auth.ts`). There is intentionally **no `localStorage`/`sessionStorage` persistence** — a full reload logs you out.
- Refresh token is an httpOnly cookie set by the backend, so it is unreadable client-side.
- `middleware.ts` therefore guards `/dashboard/*` by checking only for the **presence** of the `refreshToken` cookie and redirecting to `/login`. Note: `app/dashboard/` does not exist yet — the guard is scaffolded ahead of the route.
- Login flow: `LoginForm` → `useLogin` → `useLoginStore.login` → `loginApi` → `useAuthStore.setSession` → `router.push("/")`.

## Env

- `NEXT_PUBLIC_API_URL` is the required public backend base, **no trailing slash** (`http://localhost:3001/api` in dev). Read it only through `getApiBaseUrl()` in `lib/config.ts`.
- `APP_NAME` and `API_URL` exist in the env files but are currently unused by the code — `app/layout.tsx` hardcodes its metadata title.
- `.env.development` / `.env.production` are **committed** (only `.env*.local` is gitignored). `next dev` loads `.env.development`; `next build`/`next start` load `.env.production`. Edit the right file per environment — there is no `.env` file.

## Testing quirks

- Vitest with `globals: true` + jsdom. Still import `describe`/`test`/`expect` explicitly, matching the existing test file.
- `vitest.config.ts` defines **no path alias**, so `@/*` (declared in `tsconfig.json` and working in Next) will **not** resolve under Vitest. Use relative imports in tests and test-adjacent code, or add `resolve.alias` before using `@/`.
- Mock the network with `vi.stubGlobal("fetch", ...)` and always pass an explicit `baseUrl` so tests never depend on `.env`.
- `redirectToLogin()` in `lib/fetcher.ts` is suppressed under `process.env.VITEST` — don't assert on navigation in tests.
- Only one test file exists; `lib/__tests__/` is the convention for colocated tests.

## Conventions

- Code comments and all user-facing strings/validation messages are in **Bahasa Indonesia**. Match that.
- Tailwind `content` globs are pinned to `app`, `components`, `features`, `stores`, `lib`. A new top-level source directory must be added to `tailwind.config.ts` or its classes get purged.
- `lib/utils.ts` exports `cn()` — a plain filter+join. `clsx` and `tailwind-merge` are **not** installed, so `cn()` does no conflict resolution. Don't write code that depends on Tailwind class overriding.
- No `"use client"` in `app/layout.tsx`, `app/page.tsx`, `app/loading.tsx`, or any `features/*/service`, `features/*/schema`, `features/*/store` consumed by client components — keep server components as the default and mark at the leaf.