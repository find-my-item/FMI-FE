import type { Meta, StoryObj } from "@storybook/react";
import CommentCard from "./CommentCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CommentItem } from "@/api/fetch/user";

const queryClient = new QueryClient();

const meta: Meta<typeof CommentCard> = {
  title: "공통 컴포넌트/CommentCard",
  component: CommentCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ul className="w-[400px]">
          <Story />
        </ul>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CommentCard>;

const mockCommentCard: CommentItem = {
  commentId: 1,
  postId: 100,
  postTitle: "분실물 게시글 제목",
  content: "댓글 내용이 여기에 들어갑니다.",
  likeCount: 5,
  imageList: [{ id: 1, imageUrl: "https://picsum.photos/400/300?random=1" }],
  createdAt: "2026-01-15T14:02:00.000Z",
  like: false,
};

export const Default: Story = {
  args: {
    data: mockCommentCard, // 👈 CommentItem 타입 자체가 아닌 데이터를 넣어야 합니다.
  },
};

export const Liked: Story = {
  args: {
    data: {
      ...mockCommentCard,
      like: true,
      likeCount: 6,
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    data: {
      ...mockCommentCard,
      imageList: [] as any,
    },
  },
};

export const LongComment: Story = {
  args: {
    data: {
      ...mockCommentCard,
      content:
        "이것은 매우 긴 댓글 예시입니다. 텍스트가 넘칠 때 말줄임표(...) 처리가 정상적으로 되는지 확인하기 위한 테스트 케이스입니다. 한 줄을 넘어서 길게 작성되었습니다.",
    },
  },
};
