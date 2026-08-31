# About Games — Copilot Instructions

React 19 · TypeScript (strict) · Vite 7 · Tailwind CSS v4 · React Router v7 · i18next · Storybook · axios.
A frontend connecting YouTube video essays to the games they cover, with a public catalog and an admin ("Game Master") area.

## Guiding principles

Write code that is **readable**, **well-designed**, **clean**, and **strictly typed**. Prioritize clarity over cleverness. Follow existing patterns before inventing new ones.

---

## TypeScript — strictness rules

These are non-negotiable. The project compiles with `strict`, `noUnusedLocals`, `noUnusedParameters`, and `verbatimModuleSyntax`.

- **Never use `any`.** Prefer `unknown`, union types, or generics.
- **Avoid type assertions (`as`)** to bypass the compiler. Use type guards and narrowing instead. `as const` for literal unions is fine.
- **Always annotate return types** on functions, hooks, and components. Async functions return `Promise<T>`.
- **Use `import type` for type-only imports.** Because `verbatimModuleSyntax` is on, importing a type without `import type` is an error.
- **Always include the file extension** in imports: `import Game from "./Game.model.ts"` (`.ts` / `.tsx`).
- **Narrow `null` / `undefined`** before use. Nullable API fields are modeled as `string | null`, not just optional.
- **Catch `unknown`** and narrow it (`e instanceof AxiosError`, `e instanceof SpecificError`) before reading fields.
- **Use `as const` + indexed access** for finite string unions, e.g.:
  ```ts
  export const ChannelLanguages = ["en", "fr"] as const;
  export type ChannelLanguage = (typeof ChannelLanguages)[number];
  ```
- **No dead code**: no unused imports, variables, or parameters (they fail the build).

---

## Architecture & where code goes

```
src/
├── components/    # Reusable UI: ComponentName.component.tsx + stories/ComponentName.stories.tsx
├── config/        # App / API / localStorage config (default-exported objects, named consts)
├── contexts/      # React contexts (Auth, ChannelsSettings, GamesList, UnverifiedVideosList)
├── data-access/   # Typed API calls, one function per file + {domain}/model/ for DTOs
├── helpers/       # axios instance, toasts, utils, auth, games helpers
├── hooks/         # Custom hooks: useXxx.hook.ts
├── i18n/          # i18next setup + content/{fr,en}.json
├── layouts/       # PageLayout wrapper
├── models/        # Shared domain types (Game, Video, Channel, IgdbGame)
├── pages/         # Route-level pages
├── router/        # routes.config.ts, router.tsx, AuthRoute
└── types/         # Error types
```

- **Context providers** wrap the app in `App.tsx`: `AuthProvider`, `ChannelsSettingsProvider`, `GamesListProvider`, `UnverifiedVideosListProvider`.
- **Routing** is declared in `src/router/routes.config.ts` as a nested object with `path` and a type-safe `goTo()` builder. Slug-based URLs use `createSlug(id, title)`; parse ids with `getIdFromSlug(slug)`. Navigation goes through `useAppRoutes()` (`goToGame`, `goToVideo`, `goBack`, ...), never raw string URLs.

---

## Conventions

### Component-oriented mindset

Think in small, focused, reusable components. Prefer composing existing pieces over duplicating markup or logic.

- **Reuse first**: before writing JSX, check `src/components/` for an existing component (Button, Card, Modal, VideoThumbnail, ...) that already covers the need.
- **Edit existing components when needed**: if a component is *almost* right, extend it (new optional prop, variant, or refactor) rather than forking a near-copy. Keep changes backward-compatible with sensible defaults.
- **Extract rather than bloat**: when a component grows beyond one responsibility, pull pieces into new components (and optionally a shared `stories/`).
- **Create new components freely**: a new well-scoped component is better than a tangled page. One component per concern, colocated in its own folder with `Xxx.component.tsx` + `stories/Xxx.stories.tsx`.
- **Remove dead components**: if a component becomes unused after a refactor, delete it (and its Storybook story). Don't leave orphaned code.
- **Prefer declarative props over imperative logic**: pass `onXxx` callbacks and render via props/children; keep state local where possible and lift it only when necessary.
- **Colocate by feature**: styles, sub-components, and stories for a component live together under `components/Xxx/`.

### Naming & files
- Components: `Xxx.component.tsx` → `export default Xxx`, props as `export type XxxProps`, declared with `React.FC<XxxProps>`.
- Hooks: `useXxx.hook.ts` → `export type UseXxx = {...}` + `export default useXxx`.
- Data-access: `verbOneNoun.ts` → `export default verbOneNoun`.
- Models: `Xxx.model.ts` → `export type Xxx`.
- Config: `xxx.config.ts` → `export default XxxConfig` or named constants.
- Utils: `xxx.utils.ts` → named pure functions.
- Storybook: one `Xxx.stories.tsx` per component.

### Data-access
- One exported async function per file with a typed params object and explicit `Promise<T>` return.
- Use the shared `api` axios instance from `src/helpers/axios/axios.ts` (base URL + auth interceptor are already configured).
- Routes come from `ApiConfig.routes`.
- Handle `403` consistently:
  ```ts
  } catch (e: unknown) {
    if (e instanceof AxiosError && e.response?.status === 403) {
      throw new SpecificError(ApiErrorType.FORBIDDEN);
    }
    throw e;
  }
  ```
- DTOs live in `src/data-access/{domain}/model/`; shared domain types in `src/models/`.

### Hooks
- Return a typed object; always `export type UseXxx`.
- Stabilize callbacks with `useCallback` and derived values with `useMemo`; keep dependency arrays correct (run `npm run lint` — `react-hooks/exhaustive-deps` is enabled).
- Debounce with a `useRef<Timeout>` and guard stale async responses with a request-id ref (see `useIgdbSearch.hook.ts`).

### Errors & feedback
- Domain errors: throw/check `SpecificError` with `ApiErrorType` (`src/types/error/error.types.ts`); map to i18n via `ErrorMessageI18nKeys`.
- Toasts: use `launchSuccessToast` / `launchErrorToast` / `launchWarningToast` / `launchBasicToast` from `src/helpers/toasts/toasts.ts`.

### i18n
- All user-facing strings go through `useTranslation()` (`const { t } = useTranslation()`), with keys added to both `src/i18n/content/en.json` and `fr.json`. Never hardcode UI text.

### Styling
- Tailwind CSS v4 utility classes; conditional classes via template literals:
  ```tsx
  className={`base-class ${isActive ? "active-class" : "idle-class"}`}
  ```
- Prettier (with Tailwind plugin) sorts and merges classes — don't fight its formatting.

---

## Readability & cleanliness

- **One idea per function/component.** Extract helpers when a block exceeds ~30 lines or mixes concerns.
- **Meaningful names**; no cryptic abbreviations.
- **No commented-out code** and **no leftover `console.log`/`debugger`** (debugging statements are the only exception — remove them before finishing).
- **Prefer pure, typed helpers** in `helpers/` over inline logic repeated in components.
- **Match surrounding style**: look at a neighboring file before writing a new one.

## Verification

Before considering work done, run:

```bash
npm run lint    # ESLint (TS + react-hooks + react-refresh + storybook)
npm run build   # tsc -b && vite build — this is the real type gate
```

- Commit messages follow Conventional Commits (commitlint).
- Husky + lint-staged run `eslint --fix` on staged files automatically.
