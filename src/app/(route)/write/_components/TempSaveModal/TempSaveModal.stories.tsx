import { Meta, StoryObj } from "@storybook/nextjs";
import TempSaveModal from "./TempSaveModal";

const meta: Meta<typeof TempSaveModal> = {
  title: "페이지/글쓰기/TempSaveModal",
  component: TempSaveModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TempSaveModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
