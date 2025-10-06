import { Meta, StoryObj } from "@storybook/nextjs";
import RequiredText from "./RequiredText";

const meta: Meta<typeof RequiredText> = {
  title: "Components/RequiredText",
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
