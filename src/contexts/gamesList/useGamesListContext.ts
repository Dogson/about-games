import { useCallback, useContext, useEffect, useRef, useState } from "react";
import type { GamesListItem } from "../../models/Game.model.ts";
import getAllGames from "../../data-access/games/getAllGames.ts";
import { ChannelsSettingsContext } from "../channelsSettings/ChannelsSettingsContext.ts";

export type UseGamesListContext = {
  games: GamesListItem[];
  reloadGames: (searchText?: string) => Promise<void>;
  nextPage: () => Promise<void>;
  isLoadingGames: boolean;
  searchFilter: string;
  onChangeSearchFilter: (newFilter: string) => void;
  totalGames: number;
  totalPages: number;
};

const useGameListContext = (): UseGamesListContext => {
  const { languages } = useContext(ChannelsSettingsContext);
  const [games, setGames] = useState<GamesListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestRequestId = useRef<number>(0);

  const onChangeSearchFilter = useCallback((newFilter: string) => {
    setSearchFilter(newFilter);
  }, []);

  const reloadGames = useCallback(
    async (searchText?: string) => {
      setPage(1);
      setGames([]);
      setLoading(true);

      const requestId = ++latestRequestId.current;

      try {
        const result = await getAllGames({
          page: 1,
          search: searchText,
          onlyValidated: true,
          languages,
        });

        // 🧠 Ignore results from older requests
        if (requestId === latestRequestId.current) {
          setGames(result.data);
          setTotalGames(result.total);
          setTotalPages(result.totalPages);
        }
      } catch (err) {
        console.error("Error loading games:", err);
      } finally {
        // Only stop loading if still the latest request
        if (requestId === latestRequestId.current) {
          setLoading(false);
        }
      }
    },
    [languages],
  );

  const nextPage = useCallback(async () => {
    if (loading) return;
    if (page === totalPages) return;
    setLoading(true);
    const newPage = page + 1;

    const requestId = ++latestRequestId.current;

    try {
      const newGames = await getAllGames({
        page: newPage,
        search: searchFilter,
        onlyValidated: true,
        languages,
      });

      if (requestId === latestRequestId.current) {
        setGames((prev) => [...prev, ...newGames.data]);
        setPage(newPage);
      }
    } catch (err) {
      console.error("Error loading next page:", err);
    } finally {
      if (requestId === latestRequestId.current) {
        setLoading(false);
      }
    }
  }, [languages, loading, page, searchFilter, totalPages]);

  // === Debounce search ===
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const timeoutMs = searchFilter ? 300 : 0;

    debounceTimeoutRef.current = setTimeout(() => {
      reloadGames(searchFilter);
    }, timeoutMs); // 300ms debounce delay

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchFilter, reloadGames]);

  return {
    games,
    reloadGames,
    nextPage,
    isLoadingGames: loading,
    onChangeSearchFilter,
    searchFilter,
    totalGames,
    totalPages,
  };
};

export default useGameListContext;
