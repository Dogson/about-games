import React, { useEffect, useRef, useState } from "react";

export type YoutubeVideoProps = {
  seekTo: number;
  youtubeId: string;
  title: string;
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
  title,
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
          onReady: () => setPlayerReady(true),
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
    <div className="flex w-full justify-center">
      <div
        className={`flex w-full flex-col gap-3 ${
          smallContainer ? "max-w-[460px]" : "max-w-[960px]"
        }`}
      >
        {/* Title matches exact video width */}
        <span className="font-title block w-full text-2xl">{title}</span>

        {/* Video wrapper */}
        <div className="aspect-video w-full">
          <div ref={containerRef} className="h-full w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideo;
