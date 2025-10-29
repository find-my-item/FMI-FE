import type { Meta, StoryObj } from "@storybook/react";
import Location from "./Location";

const meta = {
  title: "공통 컴포넌트/Location",
  component: Location,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Location>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "위치 상세 보기",
  },
};
