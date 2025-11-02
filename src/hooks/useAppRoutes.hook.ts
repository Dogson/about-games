import { routes } from "../router/routes.config.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
};

const useAppRoutes = (): UseAppRoutes => {
  const navigate = useNavigate();
  const [currentGameId, setCurrentGameId] = useState<number | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);

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

  useEffect(() => {
    if (gameIdTitle) {
      setCurrentGameId(getIdFromSlug(gameIdTitle));
    }
  }, [gameIdTitle]);

  useEffect(() => {
    if (videoIdTitle) {
      setCurrentVideoId(getIdFromSlug(videoIdTitle));
    }
  }, [videoIdTitle]);

  return {
    goToGame,
    goToVideo,
    currentGameId,
    currentVideoId,
  };
};

export default useAppRoutes;
