import React from "react";
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";

const timestampRegex = /\b(?:\d{1,2}:)?\d{1,2}:\d{2}\b/g;
const splitRegex = /(\b(?:\d{1,2}:)?\d{1,2}:\d{2}\b)/g;

const linkifyOptions = {
  formatHref: (href: string, type: string) => {
    if (type === "hashtag") {
      return `https://youtube.com/hashtag/${href.replace("#", "")}`;
    }
    return href;
  },
};

type DescriptionLinkifyProps = {
  text: string;
  onTimestampClick: (timestamp: string) => void;
};

const DescriptionLinkify: React.FC<DescriptionLinkifyProps> = ({
  text,
  onTimestampClick,
}) => {
  // Split text by timestamps, keep the timestamps in the array
  const parts = text.split(splitRegex);

  return parts.map((part, index) => {
    // Check if this part matches timestamp
    if (timestampRegex.test(part)) {
      return (
        <button
          key={index}
          className="text-corn cursor-pointer font-bold"
          onClick={() => {
            onTimestampClick(part);
          }}
        >
          {part}
        </button>
      );
    } else {
      // For non-timestamp parts, run linkify-react to handle hashtags, URLs, etc.
      return (
        <Linkify key={index} options={linkifyOptions}>
          {part}
        </Linkify>
      );
    }
  });
};

export default DescriptionLinkify;
