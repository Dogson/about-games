import { routes } from "../router/routes.config.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { getIdFromSlug } from "../helpers/games/games.helpers.ts";

type UseAppRoutes = {
  goToGame: (game: { title: string; id: number }) => void;
  goToVideo: (video: {
    id: number;
    title: string;
    game: { title: string; id: number };
  }) => void;
  currentGameId: number | null;
  currentVideoId: number | null;
  isAdminRoute: boolean;
  goToParentRoute: () => void;
};

const useAppRoutes = (): UseAppRoutes => {
  const navigate = useNavigate();

  const location = useLocation();

  const { gameIdTitle, videoIdTitle } = useParams<{
    gameIdTitle: string;
    videoIdTitle: string;
  }>();

  const goToGame = (game: { title: string; id: number }) => {
    navigate(
      routes.game.goTo({
        id: game.id,
        title: game.title,
      }),
    );
  };

  const goToVideo = (video: {
    id: number;
    title: string;
    game: { title: string; id: number };
  }) => {
    navigate(
      routes.game.video.goTo({
        gameId: video.game.id,
        gameTitle: video.game.title,
        videoId: video.id,
        videoTitle: video.title,
      }),
    );
  };

  const currentGameId = useMemo(() => {
    if (gameIdTitle) return getIdFromSlug(gameIdTitle);
    return null;
  }, [gameIdTitle]);

  const currentVideoId = useMemo(() => {
    if (videoIdTitle) return getIdFromSlug(videoIdTitle);
    return null;
  }, [videoIdTitle]);

  const goToParentRoute = useCallback(() => {
    const parentPath =
      location.pathname.split("/").slice(0, -1).join("/") || "/";
    navigate(parentPath);
  }, []);

  return {
    goToGame,
    goToVideo,
    currentGameId,
    currentVideoId,
    goToParentRoute,
    isAdminRoute: location.pathname.endsWith("/admin"),
  };
};

export default useAppRoutes;
