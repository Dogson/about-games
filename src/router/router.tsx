import { createBrowserRouter, Navigate } from "react-router-dom";
import { routes } from "./routes.config.ts";
import LoginPage from "../pages/LoginPage/LoginPage.component.tsx";
import ErrorComponent from "../components/ErrorComponent/ErrorComponent.component.tsx";
import HomePage from "../pages/HomePage/HomePage.component.tsx";
import GamePage from "../pages/GamePage/GamePage.component.tsx";
import VideoPage from "../pages/VideoPage/VideoPage.component.tsx";
import AuthRoute from "./AuthRoute.tsx";
import AdminHomePage from "../pages/AdminHomePage/AdminHomePage.component.tsx";
import AdminChannelsListPage from "../pages/AdminChannelsListPage/AdminChannelsListPage.component.tsx";
import AdminChannelPage from "../pages/AdminChannelPage/AdminChannelPage.component.tsx";
import AdminVideoPage from "../pages/AdminVideoPage/AdminVideoPage.component.tsx";

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
      { path: "/game/:idTitle", element: <GamePage /> },
      { path: "/game/:idTitle/video/:idVideo", element: <VideoPage /> },

      // Admin routes with AuthRoute as parent
      {
        path: "/game/:idTitle/admin",
        element: <AuthRoute />,
        children: [{ path: "", element: <AdminHomePage /> }],
      },
      {
        path: "/admin",
        element: <AuthRoute />,
        children: [{ path: "", element: <AdminChannelsListPage /> }],
      },
      {
        path: "/admin/channel/:idChannel",
        element: <AuthRoute />,
        children: [{ path: "", element: <AdminChannelPage /> }],
      },
      {
        path: "/game/:idTitle/video/:idVideo/admin",
        element: <AuthRoute />,
        children: [{ path: "", element: <AdminVideoPage /> }],
      },
    ],
    errorElement: <ErrorComponent />,
  },
]);
