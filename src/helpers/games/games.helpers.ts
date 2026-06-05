import type { IGDBGame } from "../../models/IgdbGame.model.ts";
import type { CreateGameDTO } from "../../data-access/games/model/games.model.ts";

export const mapIgdbGamesToCreateGamesDTO = (
  igdbGame: IGDBGame,
): CreateGameDTO => {
  const firstReleaseDate = getFirstReleaseDate(igdbGame);
  if (igdbGame.name === "Crazy Taxi") {
    console.log(firstReleaseDate);
    console.log(
      firstReleaseDate && new Date(firstReleaseDate * 1000).toISOString(),
    );
  }

  return {
    title: igdbGame.name,
    igdbId: igdbGame.id,
    boxartImg: igdbGame.cover?.url
      ? `https:${igdbGame.cover.url.replace("t_thumb", "t_cover_big")}`
      : null,
    coverImg: igdbGame.screenshots?.[0]?.url
      ? `https:${igdbGame.screenshots?.[0]?.url.replace("t_thumb", "t_1080p")}`
      : null,
    releaseDate: firstReleaseDate
      ? new Date(firstReleaseDate * 1000).toISOString()
      : null,
    companies: (igdbGame.involved_companies || []).map(
      (company) => company.company.name,
    ),
    ignoreDuringSearch: false,
  };
};

export const getFirstReleaseDate = (igdbGame: IGDBGame): number | null => {
  return igdbGame.release_dates && igdbGame.release_dates.length > 0
    ? Math.min(
        ...(igdbGame.release_dates || [])
          .filter((date) => date.date)
          .map((date) => date.date),
      )
    : null;
};

export const createSlug = (id: number, title: string): string => {
  const formattedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${id}-${formattedTitle}`;
};

export const getIdFromSlug = (slug: string): number | null => {
  const match = slug.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : null;
};

export const sortSameTitleGamesByReleaseDate = (
  igdbGames: IGDBGame[],
): IGDBGame[] => {
  const firstOccurrence = new Map<string, number>();

  igdbGames.forEach((game, index) => {
    if (!firstOccurrence.has(game.name)) {
      firstOccurrence.set(game.name, index);
    }
  });

  return [...igdbGames].sort((gameA, gameB) => {
    if (gameA.name === gameB.name) {
      return (
        (getFirstReleaseDate(gameA) || 0) - (getFirstReleaseDate(gameB) || 0)
      );
    }

    return firstOccurrence.get(gameA.name)! - firstOccurrence.get(gameB.name)!;
  });
};
