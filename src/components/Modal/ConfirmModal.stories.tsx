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

export const IconMediumModal: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Title",
    content: "Content",
    icon: "Search",
    iconTitle: "Search",
    onConfirm: () => {},
    onFalse: () => {},
    size: "medium",
    iconSize: 20,
  },
};

export const IconSmallModal: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Title",
    content: "Content",
    icon: "Search",
    iconTitle: "Search",
    onConfirm: () => {},
    onFalse: () => {},
    size: "small",
    iconSize: 20,
  },
};

export const NoIconMediumModal: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Title",
    content: "Content",
    onConfirm: () => {},
    onFalse: () => {},
    size: "medium",
  },
};

export const NoIconSmallModal: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Title",
    content: "Content",
    onConfirm: () => {},
    onFalse: () => {},
    size: "small",
  },
};
