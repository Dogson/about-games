import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "../../components/Logo/Logo.component.tsx";
import { useTranslation } from "react-i18next";
import { Separator } from "../../components/Separator/Separator.component.tsx";
import { GamesListContext } from "../../contexts/gamesList/GamesListContext.ts";
import GameGrid from "../../components/GameGrid/GameGrid.component.tsx";
import SearchInput from "../../components/Inputs/SearchInput/SearchInput.component.tsx";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import useElementInViewport from "../../hooks/useElementInViewport.hook.ts";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";
import { useNavigate, useNavigationType } from "react-router-dom";
import IconButton from "../../components/Buttons/IconButton/IconButton.component.tsx";
import { AuthContext } from "../../contexts/auth/AuthContext.ts";
import { LuSettings } from "react-icons/lu";
import { routes } from "../../router/routes.config.ts";
import { ChannelsSettingsContext } from "../../contexts/channelsSettings/ChannelsSettingsContext.ts";
import LanguageCode from "../../components/LanguageCode/LanguageCode.component.tsx";
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton.component.tsx";
import VideoLanguagesModal from "../../components/Modals/VideosLanguagesModal/VideoLanguagesModal.component.tsx";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { isAdmin } = useContext(AuthContext);

  const { games, nextPage, onChangeSearchFilter, searchFilter, reloadGames } =
    useContext(GamesListContext);
  const { languages, changeLanguages } = useContext(ChannelsSettingsContext);
  useState(false);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [isLogoInView, setIsLogoInView] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { goToGame } = useAppRoutes();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  useElementInViewport(logoRef, (inView) => {
    setIsLogoInView(inView);
  });

  const handleChangeVideoLanguages = (newLanguages: string[]) => {
    changeLanguages(newLanguages);
    setShowLanguageModal(false);
  };

  useEffect(() => {
    if (navigationType !== "POP") {
      onChangeSearchFilter("");
      reloadGames();
    }
  }, [navigationType, onChangeSearchFilter, reloadGames]);

  return (
    <PageLayout noHeader={isLogoInView}>
      <div
        className="flex min-h-full w-full flex-1 flex-col items-center gap-8
          pt-20"
      >
        {isAdmin && (
          <IconButton
            className="fixed right-5 bottom-5"
            Icon={LuSettings}
            onClick={() => navigate(routes.admin.goTo())}
          />
        )}
        <section className="flex w-150 max-w-screen flex-col items-center gap-8">
          <div ref={logoRef} className="cursor-default">
            <Logo />
          </div>
          <span className="font-title text-lg">{t("Homepage.tagline")}</span>
          <Separator direction="horizontal" bulletSize="md" />
        </section>
        <section className="flex w-full flex-1 flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center gap-4">
            <SearchInput
              searchText={searchFilter}
              onSearch={onChangeSearchFilter}
              onClear={() => onChangeSearchFilter("")}
              placeholder={t("GameSearch.searchPlaceholder")}
            />
            {languages && (
              <div className="flex w-full flex-col items-center gap-1">
                <div
                  className="flex w-full flex-row items-center justify-center
                    gap-2"
                >
                  <span className="text-sm font-bold">
                    {t("Homepage.languages")}
                  </span>
                  <div className="flex flex-row gap-1">
                    {languages.map((lng) => (
                      <LanguageCode language={lng} />
                    ))}
                  </div>
                  {showLanguageModal && (
                    <VideoLanguagesModal
                      languages={languages}
                      onChangeLanguages={handleChangeVideoLanguages}
                      onClose={() => setShowLanguageModal(false)}
                    />
                  )}
                </div>
                <SecondaryButton onClick={() => setShowLanguageModal(true)}>
                  {t("Homepage.customizeLanguages")}
                </SecondaryButton>
              </div>
            )}
          </div>
          <GameGrid
            games={games}
            onGameClick={goToGame}
            onScrollEnd={nextPage}
          />
        </section>
      </div>
    </PageLayout>
  );
};

export default HomePage;
