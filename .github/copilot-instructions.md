# About Games

## Project Overview

A React + TypeScript + Vite application for managing and browsing video game content with YouTube integration. Uses Tailwind CSS for styling, React Router for navigation, and i18next for internationalization.

## Architecture

### Context Providers (Nested in App.tsx)

Three main context providers wrap the application:

- `AuthProvider`: Authentication state, admin roles, localStorage persistence via `persistAuth` helper
- `ChannelsSettingsProvider`: Application-wide settings (theme, language)
- `GamesListProvider`: Manages games catalog with pagination, search filtering

### Routing Structure

Routes defined in `src/router/routes.config.ts` use slug-based URLs with `createSlug(id, title)` helper:

- Public: `/`, `/games/:gameIdTitle`, `/games/:gameIdTitle/:videoIdTitle`
- Admin (protected by `AuthRoute`): `/admin`, `/admin/channels`, `/admin/videos`, `/games/:gameIdTitle/:videoIdTitle/admin`

Navigation helpers in `useAppRoutes.hook.ts` provide type-safe `goTo()` methods.

### Data Layer

API calls in `src/data-access/` use axios instance (`src/helpers/axios/axios.ts`) with:

- Base URL from `VITE_API_URL` environment variable
- Auto-attached Bearer token from localStorage via interceptor
- Custom params serializer for query strings
- Error handling: Specific `SpecificError` class for `ApiErrorType.FORBIDDEN` (403)

API routes configured in `src/config/api.config.ts`.

### Component Patterns

- **File naming**: `ComponentName.component.tsx` with separate `.stories.tsx` for Storybook
- **Styling**: Tailwind classes with dynamic template literals: `className={\`base-classes ${conditional ? 'extra-classes' : ''}\`}`
- **Props types**: Export as `ComponentNameProps` from component file
- **Internationalization**: Use `useTranslation()` hook, keys like `"Homepage.tagline"` from `src/i18n/content/{lang}.json`

## Development Workflows

### Running the Application

```bash
npm run dev              # Start Vite dev server
npm run build            # TypeScript build + Vite production build
npm run preview          # Preview production build
npm run storybook        # Launch Storybook on port 6006
```

### Code Quality

- **Linting**: `npm run lint` (ESLint with TypeScript, React hooks, Storybook configs)
- **Pre-commit**: Husky + lint-staged auto-fixes on staged files
- **Commits**: Commitlint enforces conventional commits

### Environment Setup

Create `.env` file (see `.env.example`):

```
VITE_API_URL=http://localhost:5000
```

## Key Conventions

### File Extensions

Always use `.ts` or `.tsx` extensions in imports: `import Component from './Component.component.tsx'`

### Toast Notifications

Use helper functions from `src/helpers/toasts/toasts.ts`:

- `launchSuccessToast(message, key?)`
- `launchErrorToast(message, key?)`
- `launchBasicToast(message, key?)`

### Authentication

- Check auth status: `const { isAuthenticated, isAdmin } = useContext(AuthContext)`
- Protected routes use `<AuthRoute />` wrapper with redirect-to-login on unauthorized access
- Auth persisted via `persistAuth` helper in localStorage

### Type Definitions

Models in `src/models/`: `Game.model.ts`, `Video.model.ts`, `Channel.model.ts`, `IgdbGame.model.ts`
DTOs in data-access layer: `src/data-access/{domain}/model/`

## Common Patterns

### Custom Hooks

Located in `src/hooks/`:

- `useCurrentGame(gameId)`: Fetch game data with options management
- `useCurrentVideo(videoId)`: Fetch video data
- `useAppRoutes()`: Navigation helpers with slug generation
- `useElementInViewport(ref, callback)`: Intersection observer

### Layout

Use `<PageLayout>` wrapper (in `src/layouts/PageLayout/`) for consistent page structure with optional header via `noHeader` prop.

### Modal Portal

Modals render into `#modal-root` div (defined in `App.tsx`). Use `<Modal>` component with `onClose` callback.

### Error Handling

`<AxiosErrorHandler>` wrapper in protected routes intercepts axios errors. Components use `<ErrorComponent />` as `errorElement` in router config.

## Dependencies Note

- React Router v7 (latest routing patterns)
- ag-grid-react for data tables in admin
- framer-motion for animations
- react-virtuoso for virtualized lists
- Tailwind CSS v4 with Vite plugin
