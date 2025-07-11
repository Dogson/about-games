import React, { useEffect, useRef, useState } from "react";

export type YoutubeVideoProps = {
  seekTo: number;
  youtubeId: string;
  smallContainer?: boolean;
};

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({
  youtubeId,
  seekTo,
  smallContainer = false,
}) => {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    const isApiReady =
      typeof window.YT !== "undefined" &&
      typeof window.YT.Player !== "undefined";

    const initPlayer = () => {
      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: youtubeId,
        playerVars: {
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
          },
        },
      });
    };

    if (!isApiReady) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
      setPlayerReady(false);
    };
  }, [youtubeId]);

  useEffect(() => {
    if (
      playerReady &&
      playerRef.current &&
      typeof playerRef.current.seekTo === "function"
    ) {
      playerRef.current.seekTo(seekTo, true);
    }
  }, [seekTo, playerReady]);

  return (
    <div
      className={`aspect-video w-full
        ${smallContainer ? "max-w-[400px]" : "max-w-[1200px]"}`}
    >
      <div ref={containerRef} className="h-full w-full rounded-lg" />
    </div>
  );
};

export default YoutubeVideo;
