import { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "..";

const meta: Meta<typeof Badge> = {
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "공통 컴포넌트/Badge",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
  args: {
    variant: "new",
  },
};

export const Hot: Story = {
  args: {
    variant: "hot",
  },
};
