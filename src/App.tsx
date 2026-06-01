import { AuthProvider } from "./contexts/auth/AuthProvider.tsx";
import { ChannelsSettingsProvider } from "./contexts/channelsSettings/ChannelsSettingsProvider.tsx";
import initI18n from "./i18n/i18n.ts";
import { GamesListProvider } from "./contexts/gamesList/GamesListProvider.tsx";
import { UnverifiedVideosListProvider } from "./contexts/unverifiedVideosList/UnverifiedVideosListProvider.tsx";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";

initI18n();

function App() {
  return (
    <>
      <AuthProvider>
        <ChannelsSettingsProvider>
          <GamesListProvider>
            <UnverifiedVideosListProvider>
              <>
                <ToastContainer
                  autoClose={5000}
                  hideProgressBar
                  theme={"dark"}
                  position="top-center"
                />
                <RouterProvider router={router} />
              </>
            </UnverifiedVideosListProvider>
          </GamesListProvider>
        </ChannelsSettingsProvider>
      </AuthProvider>
      <div id="modal-root">
        <div id="modal-root__overlay" />
      </div>
    </>
  );
}

export default App;
