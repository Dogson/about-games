import type { Game } from "../models/Game.model.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import getAllGames from "../data-access/games/getAllGames.ts";

type UseSearchBox = {
  searchText: string;
  onChangeSearchText: (text: string) => void;
  games: Game[];
  loading: boolean;
};

const useSearchBox = (): UseSearchBox => {
  const [searchText, setSearchText] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestRequestId = useRef<number>(0);

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const fetchGames = useCallback(async (text: string) => {
    if (!text) {
      setGames([]);
      return;
    }

    setLoading(true);
    const requestId = ++latestRequestId.current;

    try {
      const response = await getAllGames({ search: text, limit: 5 });

      // Ignore results from older requests
      if (requestId === latestRequestId.current) {
        setGames(response.data);
      }
    } catch (e) {
      console.error("Error fetching games:", e);
    } finally {
      if (requestId === latestRequestId.current) {
        setLoading(false);
      }
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    setLoading(true);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const delay = searchText ? 300 : 0; // 300ms debounce
    debounceTimeoutRef.current = setTimeout(() => {
      fetchGames(searchText);
    }, delay);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchText, fetchGames]);

  return {
    games,
    loading,
    searchText,
    onChangeSearchText: handleChangeSearchText,
  };
};

export default useSearchBox;
