import { createGameSlug } from "../helpers/games/games.helpers.ts";

export const routes = {
  home: {
    path: "/",
    goTo: () => `/`,
  },
  login: {
    path: "/login",
    goTo: () => "/login",
  },
  admin: {
    path: "/admin",
    goTo: () => "/admin",
    videos: {
      path: "/admin/videos",
      goTo: () => "/admin/videos",
    },
    channels: {
      path: "/admin/channels",
      goTo: () => "/admin/channels",
    },
    channel: {
      path: "/admin/channels/:idChannel",
      goTo: (idChannel: string) => `/admin/channel/${idChannel}`,
    },
  },
  game: {
    path: "/games/:gameIdTitle",
    goTo: (params: { id: number; title: string }) =>
      `/games/${createGameSlug(params.id, params.title)}`,
    video: {
      path: "/games/:gameIdTitle/video/:idVideo",
      goTo: (params: { gameId: number; gameTitle: string; videoId: number }) =>
        `/games/${createGameSlug(params.gameId, params.gameTitle)}/video/${params.videoId}`,
      admin: {
        path: "/games/:gameIdTitle/admin",
        goTo: (params: { id: number; title: string; videoId: number }) =>
          `/games/${createGameSlug(params.id, params.title)}/video/${params.videoId}/admin`,
      },
    },
  },
};
