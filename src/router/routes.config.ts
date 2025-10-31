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
    list: {
      path: "admin",
      goTo: () => "/admin",
    },
    channel: {
      path: "admin/channel/:idChannel",
      goTo: (idChannel: string) => `/admin/channel/${idChannel}`,
    },
  },
  game: {
    path: "/game/:idTitle",
    goTo: (idTitle: string) => `/game/${idTitle}`,
    video: {
      path: "/game/:idTitle/video/:idVideo",
      goTo: (idTitle: string, idVideo: string) =>
        `/game/${idTitle}/video/${idVideo}`,
    },
    admin: {
      path: "/game/:idTitle/admin",
      goTo: (idTitle: string) => `/game/${idTitle}/admin`,
    },
  },
};
