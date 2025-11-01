import type { IGDBGame } from "../../models/IgdbGame.model.ts";
import type { CreateGameDTO } from "../../data-access/games/model/games.model.ts";

export const mapIgdbGamesToCreateGamesDTO = (
  igdbGame: IGDBGame,
): CreateGameDTO => {
  const firstReleaseDate =
    igdbGame.release_dates && igdbGame.release_dates.length > 0
      ? Math.min(...(igdbGame.release_dates || []).map((date) => date.date))
      : undefined;

  return {
    title: igdbGame.name,
    igdbId: igdbGame.id,
    boxartImg: igdbGame.cover?.url
      ? `https:${igdbGame.cover.url.replace("t_thumb", "t_cover_big")}`
      : null,
    coverImg: igdbGame.screenshots?.[0]?.url
      ? `https:${igdbGame.screenshots?.[0]?.url.replace("t_thumb", "t_1080p")}`
      : null,
    releaseDate: firstReleaseDate ? new Date(firstReleaseDate * 1000) : null,
    companies: (igdbGame.involved_companies || []).map(
      (company) => company.company.name,
    ),
    ignoreDuringSearch: false,
  };
};

export const getFirstReleaseDate = (igdbGame: IGDBGame): number | null => {
  return igdbGame.release_dates && igdbGame.release_dates.length > 0
    ? Math.min(...(igdbGame.release_dates || []).map((date) => date.date))
    : null;
};

export const createGameSlug = (gameId: number, gameTitle: string): string => {
  const formattedTitle = gameTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${gameId}-${formattedTitle}`;
};
