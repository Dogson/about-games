import getAllGames from "../../data-access/games/getAllGames.ts";
import { createSlug } from "../games/games.helpers.ts";

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

const STATIC_ROUTES: SitemapUrl[] = [
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

/**
 * Generate dynamic sitemap URLs from games and their videos
 */
const generateDynamicUrls = async (): Promise<SitemapUrl[]> => {
  const urls: SitemapUrl[] = [];

  try {
    // Fetch all games with videos
    const response = await getAllGames({
      withVideos: true,
      limit: 10000000,
      onlyValidated: true,
    });

    // Add game URLs
    response.data.forEach((game) => {
      urls.push({
        loc: `/games/${createSlug(game.id, game.title)}`,
        changefreq: "weekly",
        priority: 0.8,
      });

      // Add video URLs for each game
      const gameWithVideos = game as Record<string, unknown>;
      if (gameWithVideos.videos && Array.isArray(gameWithVideos.videos)) {
        gameWithVideos.videos.forEach(
          (video: { id: number; title: string }) => {
            urls.push({
              loc: `/games/${createSlug(game.id, game.title)}/${createSlug(
                video.id,
                video.title,
              )}`,
              changefreq: "weekly",
              priority: 0.7,
            });
          },
        );
      }
    });
  } catch (error) {
    console.error("Error generating dynamic sitemap URLs:", error);
    throw error;
  }

  return urls;
};

/**
 * Generate complete sitemap as XML string
 */
export const generateSitemap = async (
  baseUrl: string = "https://aboutgames.gwen.cool",
): Promise<string> => {
  const dynamicUrls = await generateDynamicUrls();
  const allUrls = [...STATIC_ROUTES, ...dynamicUrls];

  const urlEntries = allUrls
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
};

/**
 * Export type for games data to be used in Node.js environment
 */
export type GamesWithVideos = {
  id: number;
  title: string;
  videos: Array<{
    id: number;
    title: string;
  }>;
};
