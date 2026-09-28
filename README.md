# About Games

> Where video creators and essayists talk about games.

A React frontend that connects YouTube video essays to the games they cover. Browse a
catalog of games, discover videos about them, and manage everything from a "Game Master"
admin area.

**Live site:** https://aboutgames.gwen.cool
**Backend API:** https://github.com/Dogson/about-games-api

## Features

### Public

- Browse games with paginated search and filtering
- Game detail pages listing associated videos
- Video detail pages with embedded YouTube player
- Filter videos by language (FR/EN)

### Admin (Game Master mode)

- Manage YouTube channels (create / edit / delete)
- Configure per-channel settings (language, regex ignore rules, AI prompt for game candidate extraction)
- Review auto-detected games and validate/ignore videos
- Search the IGDB game database to link games to videos
- View API logs

## Tech stack

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · React Router v7 · i18next ·
Storybook · ag-grid · framer-motion · react-virtuoso · axios

## Getting started

### Prerequisites

- Node.js 20+

### Install & run

```bash
npm install
cp .env.example .env   # adjust VITE_API_URL if needed
npm run dev            # start dev server
```

## Environment variables

| Variable              | Description                            | Default                  |
| --------------------- | -------------------------------------- | ------------------------ |
| `VITE_API_URL`        | Backend API base URL                   | `http://localhost:5000`  |
| `SITEMAP_BASE_URL`    | Base URL used in generated sitemap     | `http://localhost:5173`  |
| `SITEMAP_OUTPUT_PATH` | Output path for the generated sitemap  | `./public/sitemap.xml`   |

## Scripts

| Script                    | Description                                  |
| ------------------------- | -------------------------------------------- |
| `npm run dev`             | Start Vite dev server                        |
| `npm run build`           | Type-check and build for production          |
| `npm run preview`         | Preview the production build                 |
| `npm run lint`            | Run ESLint                                   |
| `npm run storybook`       | Launch Storybook on port 6006                |
| `npm run build-storybook` | Build Storybook as static site               |
| `npm run generate:sitemap`| Generate the sitemap (see SITEMAP.md)        |

## Project structure

```
src/
├── components/   # Reusable UI components
├── config/       # App, API and localStorage config
├── data-access/  # Typed API calls (auth, channels, games, videos, logs)
├── helpers/      # Axios instance, toasts, sitemap utils, etc.
├── hooks/        # Custom hooks
├── i18n/         # i18next setup + FR/EN translations
├── layouts/      # Page layout wrappers
├── models/       # Shared domain types
├── pages/        # Route-level pages
└── router/       # Router, route config, auth guard
```

## SEO / sitemap

A sitemap is generated for public and dynamic routes and committed to the repo. See
[SITEMAP.md](SITEMAP.md) for details and the GitHub Actions workflow.

## Contributing

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint).
- Husky + lint-staged run ESLint on staged files on commit.
- Run `npm run lint` before pushing.
- See `AGENTS.md` for architecture notes and coding conventions.
