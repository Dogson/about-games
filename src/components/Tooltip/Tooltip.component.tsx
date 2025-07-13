import React, { useEffect, useState, useRef } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOM from "react-dom";

type TooltipProps = {
  id: string;
  place?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  stayOpenedOnHover?: boolean;
};

const Tooltip: React.FC<TooltipProps> = ({
  id,
  place = "top",
  children,
  stayOpenedOnHover = false,
}) => {
  const [tooltipRoot, setTooltipRoot] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById("tooltip-root");
    setTooltipRoot(root);

    const anchor = document.querySelector(
      `[data-tooltip-id='${id}']`,
    ) as HTMLElement;
    if (anchor && stayOpenedOnHover) {
      anchorRef.current = anchor;

      anchor.addEventListener("mouseenter", handleAnchorEnter);
      anchor.addEventListener("mouseleave", handleAnchorLeave);
    }

    return () => {
      if (anchorRef.current && stayOpenedOnHover) {
        anchorRef.current.removeEventListener("mouseenter", handleAnchorEnter);
        anchorRef.current.removeEventListener("mouseleave", handleAnchorLeave);
      }
    };
  }, [id, stayOpenedOnHover]);

  const handleAnchorEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setVisible(true);
  };

  const handleAnchorLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setVisible(false), 150);
  };

  const handleTooltipEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setVisible(true);
  };

  const handleTooltipLeave = () => {
    setVisible(false);
  };

  const tooltipProps = stayOpenedOnHover
    ? {
        open: visible,
        clickable: true,
        anchorSelect: `[data-tooltip-id='${id}']`,
      }
    : {
        anchorId: id,
        place,
      };

  return (
    <>
      {tooltipRoot &&
        ReactDOM.createPortal(
          <ReactTooltip
            id={id}
            place={place}
            className="z-9999 max-w-[300px]"
            {...tooltipProps}
          >
            <div
              onMouseEnter={stayOpenedOnHover ? handleTooltipEnter : undefined}
              onMouseLeave={stayOpenedOnHover ? handleTooltipLeave : undefined}
            >
              {children}
            </div>
          </ReactTooltip>,
          tooltipRoot,
        )}
    </>
  );
};

export default Tooltip;
