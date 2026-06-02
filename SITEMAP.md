# Sitemap Generation

This project includes automated sitemap generation for SEO purposes.

## Overview

The sitemap includes:

### Static Routes

- `/` (homepage)
- `/admin` (admin dashboard)
- `/admin/channels` (channels management)
- `/admin/channels/create` (create new channel)

### Dynamic Routes

- `/games/:gameIdTitle` - Game detail pages
- `/games/:gameIdTitle/:videoIdTitle` - Video detail pages

## Frontend Utility

**Location:** `src/helpers/utils/sitemap.ts`

The frontend utility provides a `generateSitemap()` function that can be used in browser context to generate the sitemap dynamically. This is useful for testing or generating sitemaps client-side.

```typescript
import { generateSitemap } from "./helpers/utils/sitemap.ts";

const sitemap = await generateSitemap("https://aboutgames.gwen.cool");
```

## Node.js Script

**Location:** `scripts/generate-sitemap.mjs`

A Node.js script that generates the sitemap in a server-side environment. It:

1. Fetches all games with videos from the API using `getAllGames` endpoint
2. Generates URL entries for each game and video
3. Combines with static routes
4. Outputs XML sitemap

### Usage

```bash
# Generate sitemap locally
npm run generate:sitemap

# With custom API URL and base URL
VITE_API_URL=http://localhost:5000 SITEMAP_BASE_URL=https://example.com npm run generate:sitemap

# With custom output path
SITEMAP_OUTPUT_PATH=./dist/sitemap.xml npm run generate:sitemap
```

### Environment Variables

- `VITE_API_URL` - API URL (defaults to `http://localhost:5000`)
- `SITEMAP_BASE_URL` - Base URL for sitemap (defaults to `https://aboutgames.gwen.cool`)
- `SITEMAP_OUTPUT_PATH` - Output file path (defaults to `./public/sitemap.xml`)

## GitHub Actions Workflow

**Location:** `.github/workflows/generate-sitemap.yml`

Automated sitemap generation runs:

- **Daily**: At 2 AM UTC (scheduled)
- **On-demand**: Manual trigger via `workflow_dispatch`
- **On push**: When workflow file changes or pushed to main

### Setup

The workflow requires these secrets in GitHub:

- `API_URL` - Production API URL (e.g., `https://api.aboutgames.gwen.cool`)
- `SITEMAP_BASE_URL` (optional) - Base URL for sitemap URLs (defaults to `https://aboutgames.gwen.cool`)

### How it works

1. Checks out the repository
2. Sets up Node.js 20
3. Installs dependencies
4. Runs the sitemap generation script
5. Commits and pushes changes if sitemap was updated

The generated `public/sitemap.xml` file is committed to the repository and deployed with the site.

## Integration with Web Server

Ensure your web server serves `public/sitemap.xml` at `/sitemap.xml`:

```nginx
# nginx example
location /sitemap.xml {
    alias /path/to/public/sitemap.xml;
    add_header Cache-Control "public, max-age=86400";
}
```

## SEO Best Practices

- Submit the sitemap to Google Search Console: `https://search.google.com/search-console`
- Submit the sitemap to Bing Webmaster Tools: `https://www.bing.com/webmaster`
- The robots.txt file should reference the sitemap: `Sitemap: https://aboutgames.gwen.cool/sitemap.xml`
