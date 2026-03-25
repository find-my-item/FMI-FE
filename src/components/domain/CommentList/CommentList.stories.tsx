import type { Meta, StoryObj } from "@storybook/nextjs";
import type { UseQueryResult } from "@tanstack/react-query";
import CommentList from "./CommentList";
import { MOCK_COMMENT_RESPONSE_DATA } from "@/mock/data";
import { GetPostsCommentsResponse, useGetRepliesPostsComments } from "@/api/fetch/comment";

const meta = {
  title: "공통 컴포넌트/CommentList",
  component: CommentList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ul className="w-[380px] border border-[#E5E5E5]">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUseFetchReplies: typeof useGetRepliesPostsComments = () =>
  ({
    data: {
      comments: [],
      hasNext: false,
      nextPage: 0,
      remainingCount: 0,
      totalCommentCount: 0,
    },
    isLoading: false,
    isError: false,
    isSuccess: true,
    isFetching: false,
    isFetchingNextPage: false,
    isFetchingPreviousPage: false,
    hasNextPage: false,
    hasPreviousPage: false,
    fetchNextPage: async () => ({}) as any,
    fetchPreviousPage: async () => ({}) as any,
    error: null,
    refetch: async () => ({}) as any,
  }) as any;

export const Default: Story = {
  args: {
    comments: MOCK_COMMENT_RESPONSE_DATA,
    postId: 1,
    onSubmit: (_content, _image, _parentId) => {},
    isPending: false,
    useFetchReplies: mockUseFetchReplies,
    onDeleteComment: () => {},
    onFavoriteComment: () => {},
  },
};
