import { Meta, StoryObj } from "@storybook/nextjs";
import MainSearchHeader from "./MainSearchHeader";

const meta = {
  title: "공통 컴포넌트/Header",
  component: MainSearchHeader,
} satisfies Meta<typeof MainSearchHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <MainSearchHeader />,
};
