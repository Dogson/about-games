import React, { type ReactNode } from "react";
import { UnverifiedVideosListContext } from "./UnverifiedVideosListContext.ts";
import useUnverifiedVideosListContext from "./useUnverifiedVideosListContext.ts.ts";

export const UnverifiedVideosListProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const {
    isLoadingVideos,
    goToNextUnverifiedVideo,
    goToPreviousUnverifiedVideo,
    isFirstVideo,
    isLastVideo,
    unverifiedVideosCount,
    currentVideo,
  } = useUnverifiedVideosListContext();

  return (
    <UnverifiedVideosListContext.Provider
      value={{
        isLoadingVideos,
        goToNextUnverifiedVideo,
        goToPreviousUnverifiedVideo,
        isFirstVideo,
        isLastVideo,
        unverifiedVideosCount,
        currentVideo,
      }}
    >
      {children}
    </UnverifiedVideosListContext.Provider>
  );
};
