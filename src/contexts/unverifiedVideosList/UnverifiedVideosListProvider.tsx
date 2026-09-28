import React, { type ReactNode } from "react";
import { UnverifiedVideosListContext } from "./UnverifiedVideosListContext.ts";
import useUnverifiedVideosListContext from "./useUnverifiedVideosListContext.ts.ts";

export const UnverifiedVideosListProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const {
    isLoadingVideos,
    error,
    goToNextUnverifiedVideo,
    goToPreviousUnverifiedVideo,
    refreshUnverifiedVideos,
    isFirstVideo,
    isLastVideo,
    unverifiedVideosCount,
    totalVideosCount,
    currentVideo,
    currentVideoIdx,
  } = useUnverifiedVideosListContext();

  return (
    <UnverifiedVideosListContext.Provider
      value={{
        isLoadingVideos,
        error,
        goToNextUnverifiedVideo,
        goToPreviousUnverifiedVideo,
        refreshUnverifiedVideos,
        isFirstVideo,
        isLastVideo,
        unverifiedVideosCount,
        totalVideosCount,
        currentVideo,
        currentVideoIdx,
      }}
    >
      {children}
    </UnverifiedVideosListContext.Provider>
  );
};
