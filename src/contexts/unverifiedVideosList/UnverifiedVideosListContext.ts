import { createContext } from "react";
import type { UseUnverifiedVideosListContext } from "./useUnverifiedVideosListContext.ts.ts";

export type UnverifiedVideosListContextType = UseUnverifiedVideosListContext;

export const UnverifiedVideosListContext =
  createContext<UnverifiedVideosListContextType>({
    isLoadingVideos: true,
    currentVideo: undefined,
    goToNextUnverifiedVideo: () => {},
    goToPreviousUnverifiedVideo: () => {},
    refreshUnverifiedVideos: () => Promise.resolve(),
    isFirstVideo: false,
    isLastVideo: false,
    unverifiedVideosCount: 0,
    totalVideosCount: 0,
    currentVideoIdx: 0,
  });
