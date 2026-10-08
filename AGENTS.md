# AGENTS.md

Next.js **16.4** App Router + React 19 + TypeScript + Tailwind + Zustand frontend template. Single package, no monorepo, no CI. Git repo initialized and pushed to GitHub (`MuhammadAidil-dev/solvix-landing-page`).

## Git safety (user rule)

- **Never `git commit`, `git push`, or rewrite history without explicit user approval first.** Ask first. An instruction like "commit perubahan" authorizes one commit, not a standing pattern. Never force-push unless the user specifically asks for it.

## Baseline: verified state

Verified on Node 22.11 / npm. **Every script passes.**

```
npm run dev         # OK — 200 on / and /login, Turbopack, ~1s
npm run typecheck   # OK — 0 errors
npm test            # OK — 6 tests
npm run test:watch
npm run lint        # OK — eslint CLI, 0 errors (2 pre-existing warnings in lib/fetcher.ts)
npm run build       # OK — Turbopack, 3 routes prerendered + proxy
npm run start       # OK — 200 on / and /login
```

- Two pre-existing lint **warnings**, both in `lib/fetcher.ts`, both intentional — don't "fix" them casually:
  - `@next/next/no-location-assign-relative-destination` on the `window.location.href = "/login"` hard redirect (required by the refresh-once flow below).
  - An unused `eslint-disable` directive above the `user as any` cast.
- Next.js 16 floors: **Node ≥20.9**, TypeScript ≥5.1, ESLint ≥9. Pinned to ESLint 9.x, not 10 — `eslint-config-next@16`'s bundled `eslint-plugin-react`/`-import`/`-jsx-a11y` still cap their peer at `^9`, so ESLint 10 makes `npm ls` fail with `ELSPROBLEMS`.
- `next dev` silently falls back to **port 3001** if 3000 is occupied, and it only prints the URL once. Grep the startup log for `Local:` instead of hardcoding the port when scripting against it. Kill leftover servers by matching `node.exe` whose command line contains both `solvix-landing` and `next` — `Stop-Process` on the `npm.cmd` PID leaves orphaned `next dev` grandchildren still holding the port.
- Historical landmines, both fixed — don't reintroduce: `next.config.mjs` must not contain TypeScript syntax (Next loads `.mjs` config as plain JS → `SyntaxError`), and feature components import siblings via `../../hooks/hooks`, not `../hooks/hooks`.

## Commands (notes)

- No `format` script. Prettier must be run manually: `npx prettier --write .` (config: semi, double quotes, trailingComma `es5`, printWidth 100). Note `next build` rewrites `tsconfig.json` with its own 2-space JSON formatting — re-run Prettier after a build if you touch it.
- Run a single test file: `npx vitest run lib/__tests__/fetcher.test.ts`; single test by name: `npx vitest run -t "refresh-once"`.
- Use `workdir` rather than `cd` in this repo — the absolute path contains spaces (`TOP SOLVIX LABS PROJECT`), which breaks naive `cd` + npm invocations.

## Next.js 16 constraints (what is now gone or changed)

Migrated from 14 → 16. Don't reintroduce these removed APIs:

- **`next lint` no longer exists** and `next build` no longer runs lint. `npm run lint` is the standalone ESLint CLI against the flat `eslint.config.mjs`.
- **Turbopack is the default bundler** for `dev` and `build`. There is no custom webpack config in `next.config.mjs`, and adding one will fail the build — use the top-level `turbopack` key, not `experimental.turbopack`. Opt out with `--webpack` only if a dependency forces it.
- **Synchronous request APIs are fully removed**: `cookies()`, `headers()`, `draftMode()`, `params`, `searchParams` must be awaited. The app currently reads none of them, so nothing to migrate today.
- `middleware.ts` → `proxy.ts`, exported function renamed to `proxy`. `proxy` runs on the **Node runtime only**; `edge` is not supported there, so if a future route genuinely needs the edge runtime, keep the deprecated `middleware.ts` deliberately rather than renaming blindly.
- `revalidateTag()` now needs a cacheLife profile (`revalidateTag(tag, "max")`); single-arg is a TypeScript error. Unused here.
- Removed and not to be added back: AMP, `serverRuntimeConfig`/`publicRuntimeConfig`, `devIndicators` options, `experimental.ppr`/`dynamicIO`/`useCache`.

## Layout and boundaries

```
app/            Next App Router pages + layout/error/loading + globals.css (Tailwind directives only)
components/ui/  Presentational primitives: Button, Input, Toast
features/<f>/   Per-feature vertical slice — components/, hooks/, schema/, service/, store/
lib/            Cross-cutting: fetcher.ts, api-error.ts, config.ts, utils.ts
stores/         Global cross-feature stores only (currently just auth session)
middleware.ts → proxy.ts   Route guard (Next 16: request interception lives in `proxy.ts`, exported function must be named `proxy`, Node runtime only)
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
- `proxy.ts` therefore guards `/dashboard/*` by checking only for the **presence** of the `refreshToken` cookie and redirecting to `/login`. Note: `app/dashboard/` does not exist yet — the guard is scaffolded ahead of the route.
- Login flow: `LoginForm` → `useLogin` → `useLoginStore.login` → `loginApi` → `useAuthStore.setSession` → `router.push("/")`.

## Env

- `NEXT_PUBLIC_API_URL` is the required public backend base, **no trailing slash** (`http://localhost:3001/api` in dev). Read it only through `getApiBaseUrl()` in `lib/config.ts`.
- `APP_NAME` and `API_URL` exist in the env files but are currently unused by the code — `app/layout.tsx` hardcodes its metadata title.
- `.env.development` / `.env.production` are **untracked** (covered by `.env` / `.env.*` in `.gitignore`; only `.env.example` is committed). A fresh clone lacks them — recreate from `.env.example`. `next dev` loads `.env.development`; `next build`/`next start` load `.env.production`. Edit the right file per environment — there is no `.env` file.

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