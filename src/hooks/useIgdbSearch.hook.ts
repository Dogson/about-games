import { useCallback, useEffect, useRef, useState } from "react";
import type { IGDBGame } from "../models/IgdbGame.model";
import searchIgdbGames from "../data-access/games/searchIgdbGames";
import { launchErrorToast } from "../helpers/toasts/toasts";
import { SpecificError } from "../types/error/error.types";
import { useTranslation } from "react-i18next";

type UseIgdbSearch = {
  searchValue: string;
  onChangeSearchValue: (value: string) => void;
  igdbGames: IGDBGame[];
  isSearching: boolean;
  noGamesFound: boolean;
};

const useIgdbSearch = (): UseIgdbSearch => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>("");
  const [igdbGames, setGames] = useState<IGDBGame[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [noGamesFound, setNoGamesFound] = useState<boolean>(false);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestRequestId = useRef<number>(0);

  const searchForIgdbGames = useCallback(
    async (search: string) => {
      const requestId = ++latestRequestId.current;
      setNoGamesFound(false);
      try {
        setIsSearching(true);
        const result = await searchIgdbGames({ search });

        // Ignore old requests
        if (requestId === latestRequestId.current) {
          setGames(result);
          setNoGamesFound(result.length === 0);
        }
      } catch (e) {
        if (requestId !== latestRequestId.current) return; // ignore stale errors too

        if (e instanceof SpecificError) {
          launchErrorToast(t(`${e.apiErrorKey}`));
        } else {
          console.error(e);
        }
      } finally {
        setIsSearching(false);
      }
    },
    [t],
  );

  // === Debounce search ===
  useEffect(() => {
    if (!searchValue || searchValue.trim().length === 0) {
      setGames([]);
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      searchForIgdbGames(searchValue);
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchValue, searchForIgdbGames]);

  return {
    searchValue,
    onChangeSearchValue: setSearchValue,
    igdbGames,
    isSearching,
    noGamesFound,
  };
};

export default useIgdbSearch;
