import type { Meta, StoryObj } from "@storybook/react";
import Filter from "./Filter";

const meta = {
  title: "공통 컴포넌트/Filter",
  component: Filter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: "지역",
    onSelected: true,
    children: "지역 선택",
    icon: { name: "Location" },
  },
};

export const WithLogo: Story = {
  args: {
    onSelected: false,
    children: "카테고리",
    icon: { name: "ArrowDown" },
    ariaLabel: "카테고리 선택",
  },
};
