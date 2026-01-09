import { Meta, StoryObj } from "@storybook/nextjs";
import CategorySection from "./CategorySection";

const meta: Meta<typeof CategorySection> = {
  title: "페이지/글쓰기/CategorySection",
  component: CategorySection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-[390px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};
