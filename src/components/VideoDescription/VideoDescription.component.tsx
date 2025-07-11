import React, { useEffect, useRef, useState } from "react";
import DescriptionLinkify from "./DescriptionLinkify.component.tsx";

export type VideoDescriptionProps = {
  description: string;
  onTimestampClick: (timestamp: number) => void;
};

const COLLAPSED_MAX_HEIGHT = 120;

const VideoDescription: React.FC<VideoDescriptionProps> = ({
  description,
  onTimestampClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(
    COLLAPSED_MAX_HEIGHT,
  );
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    const isContentOverflowing = el.scrollHeight > COLLAPSED_MAX_HEIGHT;
    setIsOverflowing(isContentOverflowing);

    if (!expanded) {
      setMaxHeight(COLLAPSED_MAX_HEIGHT);
    }
  }, [description, expanded]);

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    if (expanded) {
      setMaxHeight(el.scrollHeight);

      const onTransitionEnd = () => {
        setMaxHeight(undefined);
        el.removeEventListener("transitionend", onTransitionEnd);
      };

      el.addEventListener("transitionend", onTransitionEnd);

      return () => {
        el.removeEventListener("transitionend", onTransitionEnd);
      };
    } else {
      setMaxHeight(COLLAPSED_MAX_HEIGHT);
    }
  }, [expanded]);

  return (
    <div
      className={`bg-maize rounded-xl px-3 py-3 ${
        !expanded && isOverflowing ? "cursor-pointer" : ""
      }`}
      onClick={() => {
        if (isOverflowing && !expanded) setExpanded(true);
      }}
    >
      <div
        ref={descriptionRef}
        style={{
          maxHeight: maxHeight ? `${maxHeight}px` : "none",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
        className={`bg-maize text-sm whitespace-pre-wrap ${
          !expanded ? "line-clamp-4" : ""
        }`}
      >
        <DescriptionLinkify
          text={description}
          onTimestampClick={onTimestampClick}
        />
      </div>
    </div>
  );
};

export default VideoDescription;
