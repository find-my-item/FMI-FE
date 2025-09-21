import { Meta, StoryObj } from "@storybook/nextjs";
import Toast from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    type: { control: { type: "select" }, options: ["info", "success", "error"] },
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    message: "정상적으로 처리되었습니다.",
    type: "info",
  },
};

export const Success: Story = {
  args: {
    message: "성공적으로 저장되었습니다!",
    type: "success",
  },
};

export const Error: Story = {
  args: {
    message: "오류가 발생했습니다.",
    type: "error",
  },
};
