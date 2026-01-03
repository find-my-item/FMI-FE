import { Meta, StoryObj } from "@storybook/nextjs";
import ChatItem from "./ChatItem";

const meta: Meta<typeof ChatItem> = {
  title: "페이지/채팅 페이지/ChatItem",
  component: ChatItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "채팅 목록의 개별 채팅 아이템을 표시하는 컴포넌트입니다. 사용자 프로필, 게시글 썸네일, 메시지 미리보기, 읽지 않은 메시지 수를 포함합니다.",
      },
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
type Story = StoryObj<typeof ChatItem>;

export const Default: Story = {
  render: () => {
    return (
      <ChatItem
        chatRoom={{
          roomId: 1,
          contactUser: {
            userId: 1,
            nickname: "사용자 닉네임",
            profileImageUrl: "profile.jpg",
          },
          postInfo: {
            postId: 1,
            postType: "LOST",
            title: "테스트 게시글",
            address: "서울시 강남구 신사동",
            thumbnailUrl: "test-thumbnail.jpg",
          },
          messageType: "TEXT",
          lastMessage:
            "안녕하세요! 혹시 올리신 검정색 카드 지갑, 명동에서 습득하신 지갑이실까요? 혹시나 해서",
          lastMessageSentAt: "2026-01-01T10:00:00.000Z",
          unreadCount: 1,
        }}
      />
    );
  },
};
