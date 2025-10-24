import { Meta, StoryObj } from "@storybook/nextjs";
import ConfirmModal from "./ConfirmModal";

// TODO: 스토리북 렌더링 및 옵션 확인

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
      control: { type: "object" },
      description: "아이콘 이름. 미설정 시 아이콘 없음",
    },
    isOpen: { control: { type: "boolean" } },
  },
  args: {
    isOpen: true,
    title: "Title",
    content: "Content",
    size: "medium",
    icon: {
      name: "Search",
      size: 20,
      title: "Search",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Args를 변경해 다양한 조합을 확인하세요.",
      },
    },
  },
};
