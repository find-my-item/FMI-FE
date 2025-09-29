import { Meta, StoryObj } from "@storybook/nextjs";
import Footer from "./Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Footer />,
};
