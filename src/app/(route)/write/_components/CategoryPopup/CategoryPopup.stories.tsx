import { Meta, StoryObj } from "@storybook/nextjs";
import CategoryPopup from "./CategoryPopup";

const meta: Meta<typeof CategoryPopup> = {
  title: "페이지/글쓰기/CategoryPopup",
  component: CategoryPopup,
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
