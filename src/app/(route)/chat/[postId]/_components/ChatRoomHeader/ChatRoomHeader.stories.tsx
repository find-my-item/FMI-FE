import { Meta, StoryObj } from "@storybook/nextjs";
import ChatRoomHeader from "./ChatRoomHeader";
import { ChatRoomResponse } from "@/api/fetch/chatRoom/types/ChatRoomType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/providers/ToastProviders";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
    chatRoom: {
      control: "object",
      description: "채팅방 정보 (없으면 null 반환)",
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <div className="w-[430px] border border-gray-200">
            <Story />
          </div>
        </QueryClientProvider>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatRoomHeader>;

const mockChatRoomFound: ChatRoomResponse = {
  roomId: 1,
  unreadCount: 0,
  opponentUser: {
    opponentUserId: 2,
    nickname: "사용자 닉네임",
    profileImageUrl: "https://via.placeholder.com/40",
    emailVerified: true,
  },
  postInfo: {
    postId: 1,
    postType: "FOUND",
    title: "여기에 게시글명이 표기됩니다 여기에 게시글명이 표기됩니다. 여기에",
    address: "서울시 중구 회현동",
    thumbnailUrl: "https://via.placeholder.com/40",
  },
};

const mockChatRoomLost: ChatRoomResponse = {
  roomId: 2,
  unreadCount: 0,
  opponentUser: {
    opponentUserId: 3,
    nickname: "다른 사용자",
    profileImageUrl: "https://via.placeholder.com/40",
    emailVerified: true,
  },
  postInfo: {
    postId: 2,
    postType: "LOST",
    title: "분실물 게시글 제목입니다",
    address: "서울시 강남구 역삼동",
    thumbnailUrl: "https://via.placeholder.com/40",
  },
};

export const Found: Story = {
  args: {
    chatRoom: mockChatRoomFound,
  },
};

export const Lost: Story = {
  args: {
    chatRoom: mockChatRoomLost,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    chatRoom: {
      ...mockChatRoomFound,
      postInfo: {
        ...mockChatRoomFound.postInfo,
        thumbnailUrl: "",
      },
    },
  },
};

export const Undefined: Story = {
  args: {
    chatRoom: undefined,
  },
};
