import { AuthProvider } from "./contexts/auth/AuthProvider.tsx";
import { AppSettingsProvider } from "./contexts/appSettings/AppSettingsProvider.tsx";
import RouterWithTheme from "./router/RouterWithTheme.tsx";
import initI18n from "./i18n/i18n.ts";
import { GamesListProvider } from "./contexts/gamesList/GamesListProvider.tsx";

initI18n();

function App() {
  return (
    <>
      <AuthProvider>
        <AppSettingsProvider>
          <GamesListProvider>
            <RouterWithTheme />
          </GamesListProvider>
        </AppSettingsProvider>
      </AuthProvider>
      <div id="modal-root">
        <div id="modal-root__overlay" />
      </div>
    </>
  );
}

export default App;
