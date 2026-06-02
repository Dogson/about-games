#!/usr/bin/env node

/**
 * Sitemap generator script for About Games
 * This script runs in Node.js environment and generates a sitemap.xml file
 * Run with: node scripts/generate-sitemap.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = process.env.VITE_API_URL || "http://localhost:5000";
const BASE_URL = process.env.SITEMAP_BASE_URL || "https://aboutgames.gwen.cool";
const OUTPUT_PATH = process.env.SITEMAP_OUTPUT_PATH || "./public/sitemap.xml";

// Create slug from id and title (same logic as frontend)
function createSlug(id, title) {
  const formattedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${id}-${formattedTitle}`;
}

// Static routes
const STATIC_ROUTES = [
  {
    loc: "/",
    changefreq: "daily",
    priority: 1.0,
  },
  {
    loc: "/admin",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    loc: "/admin/channels",
    changefreq: "weekly",
    priority: 0.6,
  },
  {
    loc: "/admin/channels/create",
    changefreq: "monthly",
    priority: 0.5,
  },
];

async function generateDynamicUrls() {
  const urls = [];

  try {
    console.log(`Fetching games from API: ${API_URL}`);

    // Fetch all games with videos
    const searchParams = new URLSearchParams({
      page: "1",
      limit: "10000000",
      withVideos: "1",
      onlyValidated: "1",
    });

    const url = `${API_URL}/games?${searchParams.toString()}`;

    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}: ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(`Fetched ${data.data.length} games`);

    console.log(data.data);

    // Add game URLs
    data.data.forEach((game) => {
      urls.push({
        loc: `/games/${createSlug(game.id, game.title)}`,
        changefreq: "weekly",
        priority: 0.8,
      });

      // Add video URLs for each game
      if (game.videos && Array.isArray(game.videos)) {
        game.videos.forEach((video) => {
          urls.push({
            loc: `/games/${createSlug(game.id, game.title)}/${createSlug(
              video.id,
              video.title,
            )}`,
            changefreq: "weekly",
            priority: 0.7,
          });
        });
      }
    });

    console.log(`Generated ${urls.length} dynamic URLs`);
  } catch (error) {
    console.error("Error generating dynamic sitemap URLs:", error);
    throw error;
  }

  return urls;
}

function generateSitemapXml(urls, baseUrl) {
  const urlEntries = urls
    .map((url) => {
      const lastmod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : "";
      const changefreq = url.changefreq
        ? `<changefreq>${url.changefreq}</changefreq>`
        : "";
      const priority =
        url.priority !== undefined
          ? `<priority>${url.priority}</priority>`
          : "";

      return `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    ${lastmod}
    ${changefreq}
    ${priority}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

async function main() {
  try {
    console.log("Starting sitemap generation...");
    console.log(`Base URL: ${BASE_URL}`);

    const dynamicUrls = await generateDynamicUrls();
    const allUrls = [...STATIC_ROUTES, ...dynamicUrls];

    const sitemapXml = generateSitemapXml(allUrls, BASE_URL);

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write sitemap
    fs.writeFileSync(OUTPUT_PATH, sitemapXml, "utf-8");
    console.log(`✓ Sitemap generated successfully at ${OUTPUT_PATH}`);
    console.log(`Total URLs: ${allUrls.length}`);
  } catch (error) {
    console.error("✗ Sitemap generation failed:", error);
    process.exit(1);
  }
}

main();
