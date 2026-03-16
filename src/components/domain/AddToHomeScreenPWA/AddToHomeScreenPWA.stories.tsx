import type { Meta, StoryObj } from "@storybook/react";
import AddToHomeScreenPWA from "./AddToHomeScreenPWA";

const meta: Meta<typeof AddToHomeScreenPWA> = {
  title: "공통 컴포넌트/AddToHomeScreenPWA",
  component: AddToHomeScreenPWA,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ul className="w-[400px]">
        <Story />
      </ul>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AddToHomeScreenPWA>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
