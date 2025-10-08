import { Meta, StoryObj } from "@storybook/nextjs";
import Header from "./Header";

const meta = {
  title: "공통 컴포넌트/Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Header />,
};
