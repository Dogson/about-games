import React from "react";
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import { timestampStrToSeconds } from "../../helpers/utils/datetime.utils.ts";

const timestampRegex = /\b(?:\d{1,2}:)?\d{1,2}:\d{2}\b/g;
const splitRegex = /(\b(?:\d{1,2}:)?\d{1,2}:\d{2}\b)/g;

const MAX_URL_LENGTH = 50;

const linkifyOptions = {
  formatHref: (href: string, type: string) => {
    if (type === "hashtag") {
      return `https://youtube.com/hashtag/${href.replace("#", "")}`;
    }
    return href;
  },
  render: {
    url: ({
      attributes,
      content,
    }: {
      attributes: React.AnchorHTMLAttributes<HTMLAnchorElement>;
      content: string;
    }) => {
      const { href, ...rest } = attributes;

      return (
        <a
          {...rest}
          href={href}
          title={content}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.length > MAX_URL_LENGTH
            ? content.slice(0, MAX_URL_LENGTH - 1) + "…"
            : content}
        </a>
      );
    },
  },
};

type DescriptionLinkifyProps = {
  text: string;
  onTimestampClick: (timestamp: number) => void;
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
            onTimestampClick(timestampStrToSeconds(part));
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
