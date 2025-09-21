import { Meta, StoryObj } from "@storybook/nextjs";
import Header from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Header />,
};
