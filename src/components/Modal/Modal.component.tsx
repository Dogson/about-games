import React from "react";
import { motion, type Variants } from "framer-motion";
import { LuX } from "react-icons/lu";
import classNames from "classnames";
import MainButton from "../../components/Buttons/MainButton/MainButton.component.tsx";
import ModalPortal from "../../components/Modal/ModalPortal/ModalPortal.component.tsx";
import IconButton from "../../components/Buttons/IconButton/IconButton.component.tsx";

export type ModalProps = {
  className?: {
    Modal?: string;
    titleContainer?: string;
    title?: string;
    body?: string;
    actions?: string;
  };
  title?: string;
  onClose?: () => void;
  confirmText?: string;
  denyText?: string;
  onConfirm?: () => void;
  onDeny?: () => void;
  dangerousAction?: boolean;
  disableCloseByClickOutside?: boolean;
  children: React.ReactNode;
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const Modal: React.FC<ModalProps> = ({
  className,
  title,
  onClose,
  confirmText,
  denyText,
  onConfirm,
  onDeny,
  dangerousAction = false,
  disableCloseByClickOutside = false,
  children,
}) => {
  return (
    <ModalPortal>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={!disableCloseByClickOutside ? onClose : undefined}
      />

      {/* Modal container */}
      <motion.div
        key="modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classNames(
          "fixed inset-0 z-50 flex items-center justify-center px-4",
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={classNames(
            className?.Modal,
            `bg-mauve text-ghost border-turquoise/30 relative flex min-h-[200px]
            w-full max-w-lg flex-1 flex-col overflow-hidden rounded-2xl border
            shadow-lg shadow-black/60`,
          )}
        >
          {/* Close Button */}
          {onClose && (
            <IconButton
              Icon={LuX}
              noCircle
              onClick={onClose}
              className="text-turquoise hover:text-salmon absolute top-4 right-4
                transition-colors"
            />
          )}

          {/* Title */}
          {title && (
            <div
              className={classNames(
                "border-turquoise/30 border-b px-6 pt-6 pb-3",
                className?.titleContainer,
              )}
            >
              <h2
                className={classNames(
                  "font-title text-turquoise text-2xl",
                  className?.title,
                )}
              >
                {title}
              </h2>
            </div>
          )}

          {/* Body */}
          <div
            className={classNames(
              `text-ghost flex-1 content-center items-center space-y-4 px-6
              py-12 text-base`,
              className?.body,
            )}
          >
            {children}
          </div>

          {/* Actions */}
          {(onConfirm || onDeny) && (
            <div
              className={classNames(
                `bg-maize-dark/20 border-turquoise/30 flex justify-end gap-3
                border-t px-6 py-4`,
                className?.actions,
              )}
            >
              {onDeny && (
                <MainButton
                  onClick={onDeny}
                  className="border-turquoise text-turquoise
                    hover:bg-turquoise/20 border bg-transparent transition-all"
                >
                  {denyText}
                </MainButton>
              )}
              {onConfirm && (
                <MainButton
                  onClick={onConfirm}
                  className={classNames(
                    "text-ghost transition-all",
                    dangerousAction
                      ? "bg-salmon hover:bg-salmon/80"
                      : "bg-turquoise hover:bg-turquoise/80",
                  )}
                >
                  {confirmText}
                </MainButton>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </ModalPortal>
  );
};

export default Modal;
