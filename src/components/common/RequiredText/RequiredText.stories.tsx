import { Meta, StoryObj } from "@storybook/nextjs";
import RequiredText from "./RequiredText";

const meta: Meta<typeof RequiredText> = {
  title: "공통 컴포넌트/RequiredText",
  component: RequiredText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "",
  },
};
