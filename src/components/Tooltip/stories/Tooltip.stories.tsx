import type { Meta, StoryFn } from "@storybook/react-vite";
import Tooltip from "../Tooltip.component.tsx";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as Meta<typeof Tooltip>;

export const Default: StoryFn = () => {
  const tooltipId = "default-tooltip";

  return (
    <>
      <button
        data-tooltip-id={tooltipId}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Hover me
      </button>
      <Tooltip id={tooltipId}>This is a basic tooltip</Tooltip>
    </>
  );
};

export const WithStayOpenedOnHover: StoryFn = () => {
  const tooltipId = "hover-tooltip";

  return (
    <>
      <button
        data-tooltip-id={tooltipId}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        Hover and move to tooltip
      </button>
      <Tooltip id={tooltipId} stayOpenedOnHover>
        <div>
          <strong>Persistent Tooltip</strong>
          <p>You can hover over this tooltip without hiding it.</p>
        </div>
      </Tooltip>
    </>
  );
};

export const CustomPosition: StoryFn = () => {
  const tooltipId = "bottom-tooltip";

  return (
    <>
      <button
        data-tooltip-id={tooltipId}
        className="rounded bg-purple-600 px-4 py-2 text-white"
      >
        Hover me (bottom)
      </button>
      <Tooltip id={tooltipId} place="bottom">
        Tooltip shown at the bottom
      </Tooltip>
    </>
  );
};
