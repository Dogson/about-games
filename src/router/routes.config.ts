import { createSlug } from "../helpers/games/games.helpers.ts";

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
    channelCreate: {
      path: "/admin/channels/create",
      goTo: () => "/admin/channels/create",
    },
    channel: {
      path: "/admin/channels/:channelIdTitle",
      goTo: (params: { id: number; title: string }) =>
        `/admin/channels/${createSlug(params.id, params.title)}`,
    },
  },
  game: {
    path: "/games/:gameIdTitle",
    goTo: (params: { id: number; title: string }) =>
      `/games/${createSlug(params.id, params.title)}`,
    video: {
      path: "/games/:gameIdTitle/:videoIdTitle",
      goTo: (params: {
        gameId: number;
        gameTitle: string;
        videoId: number;
        videoTitle: string;
      }) =>
        `/games/${createSlug(params.gameId, params.gameTitle)}/${createSlug(
          params.videoId,
          params.videoTitle,
        )}`,
      admin: {
        path: "/games/:gameIdTitle/:videoIdTitle/admin",
        goTo: (params: {
          gameId: number;
          gameTitle: string;
          videoId: number;
          videoTitle: string;
        }) =>
          `/games/${createSlug(params.gameId, params.gameTitle)}/${createSlug(
            params.videoId,
            params.videoTitle,
          )}/admin`,
      },
    },
  },
};
