import { createContext } from "react";
import type { UseUnverifiedVideosListContext } from "./useUnverifiedVideosListContext.ts.ts";

export type UnverifiedVideosListContextType = UseUnverifiedVideosListContext;

export const UnverifiedVideosListContext =
  createContext<UnverifiedVideosListContextType>({
    isLoadingVideos: true,
    currentVideo: undefined,
    goToNextUnverifiedVideo: () => {},
    goToPreviousUnverifiedVideo: () => {},
    isFirstVideo: false,
    isLastVideo: false,
    unverifiedVideosCount: 0,
  });
