import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Modal, { type ModalProps } from "../Modal.component.tsx";

const meta: Meta<typeof Modal> = {
  title: "Modal/Template",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    confirmText: { control: "text" },
    denyText: { control: "text" },
    className: {},
    onClose: {},
    onConfirm: {},
    onDeny: {},
    children: {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Move the hook into a proper component
const ModalStory: React.FC<ModalProps> = (args) => {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <>
      <div id="modal-root">
        <div id="modal-root__overlay" />
      </div>
      {isOpened ? (
        <Modal
          {...args}
          onClose={() => setIsOpened(false)}
          onConfirm={() => setIsOpened(false)}
          onDeny={() => {}}
        >
          {args.children}
        </Modal>
      ) : (
        <button type="button" onClick={() => setIsOpened(true)}>
          Open Modal
        </button>
      )}
    </>
  );
};

export const ModalTemplate: Story = {
  // render now just renders the hook-safe component
  render: (args) => <ModalStory {...args} />,
  args: {
    title: "Bienvenue sur la modale",
    children: "Souhaitez vous fermer cette modal ?",
    confirmText: "Accepter",
    denyText: "Refuser",
  },
};
