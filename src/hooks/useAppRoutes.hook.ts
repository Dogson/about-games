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
  goToChannel: (channel: { id: number; title: string }) => void;
  currentGameId: number | null;
  currentVideoId: number | null;
  currentChannelId: number | null;
  isAdminRoute: boolean;
  goToParentRoute: () => void;
};

const useAppRoutes = (): UseAppRoutes => {
  const navigate = useNavigate();

  const location = useLocation();

  const { gameIdTitle, videoIdTitle, channelIdTitle } = useParams<{
    gameIdTitle: string;
    videoIdTitle: string;
    channelIdTitle: string;
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

  const currentChannelId = useMemo(() => {
    if (channelIdTitle) return getIdFromSlug(channelIdTitle);
    return null;
  }, [channelIdTitle]);

  const goToParentRoute = useCallback(() => {
    const parentPath =
      location.pathname.split("/").slice(0, -1).join("/") || "/";
    navigate(parentPath);
  }, [location.pathname, navigate]);

  const goToChannel = (channel: { id: number; title: string }) => {
    console.log(
      routes.admin.channel.goTo({
        id: channel.id,
        title: channel.title,
      }),
    );

    navigate(
      routes.admin.channel.goTo({
        id: channel.id,
        title: channel.title,
      }),
    );
  };

  return {
    goToGame,
    goToVideo,
    goToChannel,
    currentGameId,
    currentVideoId,
    currentChannelId,
    goToParentRoute,
    isAdminRoute:
      location.pathname.endsWith("/admin") ||
      location.pathname.includes("/admin/"),
  };
};

export default useAppRoutes;
