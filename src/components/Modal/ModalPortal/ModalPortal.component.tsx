import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import style from "./ModalPortal.module.css";

export type ModalPortalProps = {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
  className = "",
  onClose,
}) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const el = elRef.current!;
    const themeContainer = document.querySelector(
      ".global-theme",
    ) as HTMLDivElement;
    if (themeContainer) {
      themeContainer.appendChild(el);
    }
    return () => {
      const themeContainer = document.querySelector(
        ".global-theme",
      ) as HTMLDivElement;
      if (themeContainer) {
        themeContainer.removeChild(el);
      }
    };
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        onClose &&
        modalContentRef.current &&
        event.target instanceof Node &&
        !modalContentRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    elRef.current?.addEventListener("mousedown", handleClick);
    return () => {
      elRef.current?.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={classNames(style.overlay)}>
      <div
        ref={modalContentRef}
        className={classNames(style.modalContainer, className)}
      >
        {children}
      </div>
    </div>,
    elRef.current as HTMLDivElement,
  );
};

export default ModalPortal;
