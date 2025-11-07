import { Meta, StoryObj } from "@storybook/nextjs";
import DeleteButton from "./DeleteButton";

const meta: Meta<typeof DeleteButton> = {
  title: "공통 컴포넌트/Input/_Internal/DeleteButton",
  component: DeleteButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "값 입력",
  },
};
