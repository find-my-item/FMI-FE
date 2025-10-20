import { Meta, StoryObj } from "@storybook/nextjs";
import ConfirmModal from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: "공통 컴포넌트/ConfirmModal",
  component: ConfirmModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="h-auto w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Title",
    description: "Description",
    icon: "Icon",
  },
};
