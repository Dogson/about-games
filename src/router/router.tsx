import { createBrowserRouter, Navigate } from "react-router-dom";
import { routes } from "./routes.config.ts";
import LoginPage from "../pages/LoginPage/LoginPage.component.tsx";
import ErrorComponent from "../components/ErrorComponent/ErrorComponent.component.tsx";
import HomePage from "../pages/HomePage/HomePage.component.tsx";
import GamePage from "../pages/GamePage/GamePage.component.tsx";
import VideoPage from "../pages/VideoPage/VideoPage.component.tsx";
import AuthRoute from "./AuthRoute.tsx";
import AdminHomePage from "../pages/AdminHomePage/AdminHomePage.component.tsx";
import AdminChannelPage from "../pages/AdminChannelPage/AdminChannelPage.component.tsx";
import AdminVideoCarouselPage from "../pages/AdminVideoCarouselPage/AdminVideoCarouselPage.component.tsx";
import AdminCreateChannelPage from "../pages/AdminCreateChannelPage/AdminCreateChannelPage.component.tsx";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={routes.home.path} />,
  },
  {
    path: routes.login.path,
    element: <LoginPage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: routes.home.path,
    children: [
      // Public pages
      { path: "", element: <HomePage /> },
      { path: routes.game.path, element: <GamePage /> },
      { path: routes.game.video.path, element: <VideoPage /> },

      // Admin routes with AuthRoute as parent
      {
        path: routes.admin.path,
        element: <AuthRoute />,
        children: [{ path: "", element: <AdminHomePage /> }],
      },
      {
        path: routes.admin.channel.path,
        element: <AuthRoute />,
        children: [{ path: "", element: <AdminChannelPage /> }],
      },
      {
        path: routes.admin.channelCreate.path,
        element: <AuthRoute />,
        children: [{ path: "", element: <AdminCreateChannelPage /> }],
      },
      {
        path: routes.admin.videos.path,
        element: <AuthRoute />,
        children: [{ path: "", element: <AdminVideoCarouselPage /> }],
      },
      {
        path: routes.game.video.admin.path,
        element: <AuthRoute />,
        children: [{ path: "", element: <VideoPage /> }],
      },
    ],
    errorElement: <ErrorComponent />,
  },
]);
