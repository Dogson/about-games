import React, { useContext } from "react";
import HomeLayout from "../../layouts/HomeLayout/HomeLayout.component.tsx";
import Logo from "../../components/Logo/Logo.component.tsx";
import { useTranslation } from "react-i18next";
import { Separator } from "../../components/Separator/Separator.component.tsx";
import { GamesListContext } from "../../contexts/gamesList/GamesListContext.ts";
import GameGrid from "../../components/GameGrid/GameGrid.component.tsx";
import SearchInput from "../../components/Inputs/SearchInput/SearchInput.component.tsx";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const { games, nextPage, onChangeSearchFilter, searchFilter } =
    useContext(GamesListContext);

  return (
    <HomeLayout>
      <div className="flex min-h-full w-full flex-1 flex-col items-center gap-8">
        <section className="flex w-150 max-w-screen flex-col items-center gap-8">
          <Logo />
          <span className="font-title text-lg">{t("Homepage.tagline")}</span>
          <Separator direction="horizontal" bulletSize="md" />
        </section>
        <section className="flex w-full flex-1 flex-col items-center gap-4">
          <SearchInput
            searchText={searchFilter}
            onSearch={onChangeSearchFilter}
            onClear={() => onChangeSearchFilter("")}
            placeholder={t("Homepage.searchPlaceholder")}
          />
          <GameGrid
            games={games}
            onGameClick={() => {}}
            onScrollEnd={nextPage}
          />
        </section>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
