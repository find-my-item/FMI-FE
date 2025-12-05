import { Meta, StoryObj } from "@storybook/nextjs";
import ChatRoomHeader from "./ChatRoomHeader";

const meta: Meta<typeof ChatRoomHeader> = {
  title: "페이지/채팅 상세 페이지/ChatRoomHeader",
  component: ChatRoomHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "채팅방 상단에 표시되는 헤더 컴포넌트입니다. 뒤로가기 버튼, 사용자 닉네임, 게시글 정보(썸네일, 칩, 제목, 위치)를 포함합니다.",
      },
    },
  },
  argTypes: {
    postMode: {
      control: "radio",
      options: ["find", "lost"],
      description: "게시글 유형 (습득물/분실물)",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[430px] border border-gray-200">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatRoomHeader>;

export const Find: Story = {
  args: {
    postMode: "find",
  },
};

export const Lost: Story = {
  args: {
    postMode: "lost",
  },
};
