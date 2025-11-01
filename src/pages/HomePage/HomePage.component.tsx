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
import { useNavigationType } from "react-router-dom";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const { games, nextPage, onChangeSearchFilter, searchFilter } =
    useContext(GamesListContext);
  useState(false);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [isLogoInView, setIsLogoInView] = useState(true);
  const { goToGame } = useAppRoutes();
  const navigationType = useNavigationType();

  useElementInViewport(logoRef, (inView) => {
    setIsLogoInView(inView);
  });

  useEffect(() => {
    if (navigationType !== "POP") {
      onChangeSearchFilter("");
    }
  }, [navigationType, onChangeSearchFilter]);

  return (
    <PageLayout noHeader={isLogoInView}>
      <div
        className="flex min-h-full w-full flex-1 flex-col items-center gap-8
          pt-20"
      >
        <section className="flex w-150 max-w-screen flex-col items-center gap-8">
          <div ref={logoRef} className="cursor-default">
            <Logo />
          </div>
          <span className="font-title text-lg">{t("Homepage.tagline")}</span>
          <Separator direction="horizontal" bulletSize="md" />
        </section>
        <section className="flex w-full flex-1 flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center">
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
