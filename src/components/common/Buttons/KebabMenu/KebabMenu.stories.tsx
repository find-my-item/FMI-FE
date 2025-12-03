import type { Meta, StoryObj } from "@storybook/nextjs";
import KebabMenu from "./KebabMenu";

const meta = {
  title: "공통 컴포넌트/KebabMenu",
  component: KebabMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KebabMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { text: "지역", icon: { name: "Location" } },
      { text: "메뉴", icon: { name: "Menu" }, disabled: true },
      { text: "공유", icon: { name: "Share" }, loading: true },
    ],
  },
};
