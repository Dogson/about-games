import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppSettingsContext } from "../contexts/appSettings/AppSettingsContext.ts";
import { router } from "./router.tsx";

// Pages

const RouterWithTheme: React.FC = () => {
  const { darkMode } = useContext(AppSettingsContext);

  return (
    <div
      className={`global-theme
        ${darkMode ? "global-theme-dark" : "global-theme-light"}`}
    >
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        theme={darkMode ? "dark" : "light"}
        position="top-center"
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default RouterWithTheme;
