# AGENTS.md

Next.js **16.4** App Router + React 19 + TypeScript + Tailwind + Zustand frontend template. Single package, no monorepo, no CI. Git repo initialized and pushed to GitHub (`MuhammadAidil-dev/solvix-landing-page`).

## Git safety (user rule)

- **Never `git commit`, `git push`, or rewrite history without explicit user approval first.** Ask first. An instruction like "commit perubahan" authorizes one commit, not a standing pattern. Never force-push unless the user specifically asks for it.

## Baseline: verified state

Verified on Node 22.11 / npm. **Every script passes.**

```
npm run dev         # long-lived: starts and never exits — see "Verifying without a running server"
npm run typecheck   # OK — 0 errors
npm test            # OK — 6 tests
npm run test:watch  # long-lived: watch mode
npm run lint        # OK — eslint CLI, 0 errors (2 pre-existing warnings in lib/fetcher.ts)
npm run build       # OK — Turbopack, 3 routes prerendered + proxy
npm run start       # long-lived: needs `npm run build` first, then never exits
```

- Two pre-existing lint **warnings**, both in `lib/fetcher.ts`, both intentional — don't "fix" them casually:
  - `@next/next/no-location-assign-relative-destination` on the `window.location.href = "/login"` hard redirect (required by the refresh-once flow below).
  - An unused `eslint-disable` directive above the `user as any` cast.
- Next.js 16 floors: **Node ≥20.9**, TypeScript ≥5.1, ESLint ≥9. Pinned to ESLint 9.x, not 10 — `eslint-config-next@16`'s bundled `eslint-plugin-react`/`-import`/`-jsx-a11y` still cap their peer at `^9`, so ESLint 10 makes `npm ls` fail with `ELSPROBLEMS`.
- `next dev` silently falls back to **port 3001** if 3000 is occupied, and it only prints the URL once — grep the startup log for `Local:` instead of hardcoding the port when scripting against it. This is almost always the symptom of a leftover server, not a real problem.
- Historical landmines, both fixed — don't reintroduce: `next.config.mjs` must not contain TypeScript syntax (Next loads `.mjs` config as plain JS → `SyntaxError`), and feature components import siblings via `../../hooks/hooks`, not `../hooks/hooks`.

## Verifying without a running server

**Never start `next dev` or `next start` as a verification step.** Both are long-lived processes that never exit on their own, so a `Start-Process` without `-PassThru` leaves an orphaned process holding port 3000 — which silently pushes the next `next dev` onto 3001 and turns a clean check into a misdiagnosis.

- **`npm run build` is the authoritative check.** It compiles, prerenders every route, and prints the route table. That output already proves the page renders — a live HTTP request adds nothing.
- Route table from `next build` also proves deletions took effect (a removed route disappears from it). That replaces "curl the removed route and check for 404".
- `typecheck` + `test` + `lint` + `build` is the complete gate. All four terminate on their own.
- If a live server is genuinely unavoidable, it must be bounded: `-PassThru` to capture the PID, read readiness by polling the log, then kill the **whole tree** — `Stop-Process` on the `npm.cmd` PID leaves `next dev` grandchildren alive. Verify the port is free afterward.
- Next 16 writes its dev log to `.next/dev/logs/next-development.log`; prefer that over capturing stdout.
- Before starting anything on a port, check it is free: `Get-NetTCPConnection -State Listen -LocalPort 3000,3001`.
- Don't "wait for ready" with a fixed `Start-Sleep`. Poll for the readiness marker under a bounded loop.

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
app/            Next App Router — layout, error, loading, icon.png, globals.css
components/ui/  Primitives: Button, Section (Section + Container)
components/layout/  SiteHeader (client), SiteFooter
components/sections/ Hero, PullQuote, Services, Process, Portfolio, Team, Contact
lib/            HTTP + config infrastructure: fetcher.ts, api-error.ts, config.ts, utils.ts
stores/         Global session store (auth) — not used by the company profile page
proxy.ts        Route guard (Next 16: exported function must be named `proxy`, Node runtime only)
public/brand/   Logo assets (light/dark/icon variants)
```

> `features/` was removed when the demo UI was replaced by the company profile. The
> four-layer slice convention (`service/` `schema/` `store/` `hooks/`) no longer applies
> to any file in this repo — reintroduce it only if a feature that calls an API is added.

`lib/` + `stores/auth.ts` + `proxy.ts` are **currently unused by any rendered page**. They
are kept deliberately: they carry the repo's only test coverage and are the intended path
when a feature needs real HTTP. Don't wire the static company profile to them.

## HTTP layer (`lib/fetcher.ts`)

Single gateway for all requests. Non-obvious contracts:

- Backend always returns an envelope `{ success, message, data, error? }`. `request()` **auto-unwraps** it — callers get `data` directly, never the envelope. Don't hand-check `res.ok` or `body.success`.
- Failures are always `ApiError` (`status`, `code`, `details`, `raw`), never raw `Error`/`TypeError`. Branch on `err.status` / `err.code`.
- 10s AbortController timeout, always. Errors collapse to `status: 0` with code `TIMEOUT` or `NETWORK_ERROR`.
- Three entrypoints: `apiPublic` (no token), `apiAuth` (Bearer + refresh-once + retry), `apiServer` (no window access, no refresh). Pick by execution context.
- `apiAuth` on 401 calls `POST {base}/auth/refresh` **once**, retries the request once, and on failure does `logout()` + hard `window.location.href = "/login"`. Never call `apiAuth` from a Server Component.

## Auth model (do not "fix" this)

**Currently dead code** — no rendered page uses it. Kept for the next feature that needs real HTTP.

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

## Design system

`DESIGN.md` is the **source of truth for every visual decision** — color, typography, spacing, components, layout, voice, motion, and the 14 anti-patterns. This repo's `AGENTS.md` describes _how the code works_; `DESIGN.md` describes _how it must look_. Neither restates the other. When they seem to conflict, `DESIGN.md` wins for anything visual.

Read `DESIGN.md` before touching any component under `components/sections/`, `components/layout/`, or `tailwind.config.ts`.
