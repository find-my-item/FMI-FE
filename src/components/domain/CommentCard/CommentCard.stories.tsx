import type { Meta, StoryObj } from "@storybook/react";
import CommentCard from "./CommentCard";
import type { CommentCardType } from "@/types";

const meta: Meta<typeof CommentCard> = {
  title: "공통 컴포넌트/CommentCard",
  component: CommentCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ul className="w-[400px]">
        <Story />
      </ul>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CommentCard>;

const mockCommentCard = {
  commentId: 1,
  mentionUser: "suhyeon",
  comment: "댓글 내용이 들어갑니다. 길어지면 truncate가 적용됩니다.",
  createdAt: "2025-12-26T10:22:58",
  like: 4,
  thumbnailUrl: "https://picsum.photos/400/300?random=2",
} as const;

export const Default: Story = {
  args: {
    data: mockCommentCard,
  },
};

export const NoMention: Story = {
  args: {
    data: { ...mockCommentCard, mentionUser: "" },
  },
};

export const NoThumbnail: Story = {
  args: {
    data: { ...mockCommentCard, thumbnailUrl: "" },
  },
};

export const LongComment: Story = {
  args: {
    data: {
      ...mockCommentCard,
      comment:
        "댓글이 매우 길 때 한 줄에서 잘리는지 확인합니다. 댓글이 매우 길 때 한 줄에서 잘리는지 확인합니다. 댓글이 매우 길 때 한 줄에서 잘리는지 확인합니다.",
    },
  },
};
