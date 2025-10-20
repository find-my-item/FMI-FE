import { Meta, StoryObj } from "@storybook/nextjs";
import ConfirmModal from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: "공통 컴포넌트/ConfirmModal",
  component: ConfirmModal,
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
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium"],
      description: "모달 크기",
    },
    icon: {
      control: { type: "text" },
      description: "아이콘 이름. 미설정 시 아이콘 없음",
    },
    iconTitle: { control: { type: "text" } },
    iconSize: { control: { type: "number" } },
    isOpen: { control: { type: "boolean" } },
  },
  args: {
    isOpen: true,
    title: "Title",
    content: "Content",
    size: "medium",
    icon: "Search",
    iconTitle: "Search",
    iconSize: 20,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Docs와 Canvas에 하나의 스토리만 노출되는 Playground
export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Args를 변경해 다양한 조합을 확인하세요.",
      },
    },
  },
};
