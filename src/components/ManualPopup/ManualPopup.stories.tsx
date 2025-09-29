import { Meta, StoryObj } from "@storybook/react";
import ManualPopup from "./ManualPopup";

const meta: Meta<typeof ManualPopup> = {
  title: "Components/ManualPopup",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  component: ManualPopup,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ManualPopupStory: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
