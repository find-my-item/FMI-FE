import { Meta, StoryObj } from "@storybook/nextjs";
import Chip from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "공통 컴포넌트/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const ChipStory: Story = {
  args: {
    label: "Chip",
  },
};
