import React, { useContext, useRef, useState } from "react";
import Logo from "../../components/Logo/Logo.component.tsx";
import { useTranslation } from "react-i18next";
import { Separator } from "../../components/Separator/Separator.component.tsx";
import { GamesListContext } from "../../contexts/gamesList/GamesListContext.ts";
import GameGrid from "../../components/GameGrid/GameGrid.component.tsx";
import SearchInput from "../../components/Inputs/SearchInput/SearchInput.component.tsx";
import PageLayout from "../../layouts/PageLayout/PageLayout.component.tsx";
import useElementInViewport from "../../hooks/useElementInViewport.hook.ts";
import useAppRoutes from "../../hooks/useAppRoutes.hook.ts";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const { games, nextPage, onChangeSearchFilter, searchFilter } =
    useContext(GamesListContext);
  const searchInputRef = useRef<HTMLDivElement | null>(null);
  const [isSearchInputInView, setIsSearchInputInView] = useState(true);
  useState(false);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [isLogoInView, setIsLogoInView] = useState(true);
  const { goToGame } = useAppRoutes();

  useElementInViewport(searchInputRef, (inView) => {
    setIsSearchInputInView(inView);
  });

  useElementInViewport(logoRef, (inView) => {
    setIsLogoInView(inView);
  });

  return (
    <PageLayout noHeader={isLogoInView} noSearchInHeader={isSearchInputInView}>
      <div className="flex min-h-full w-full flex-1 flex-col items-center gap-8">
        <section className="flex w-150 max-w-screen flex-col items-center gap-8">
          <div ref={logoRef}>
            <Logo />
          </div>
          <span className="font-title text-lg">{t("Homepage.tagline")}</span>
          <Separator direction="horizontal" bulletSize="md" />
        </section>
        <section className="flex w-full flex-1 flex-col items-center gap-4">
          <div
            ref={searchInputRef}
            className="flex w-full flex-col items-center"
          >
            <SearchInput
              searchText={searchFilter}
              onSearch={onChangeSearchFilter}
              onClear={() => onChangeSearchFilter("")}
              placeholder={t("GameSearch.searchPlaceholder")}
            />
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
