import type { Meta, StoryObj } from "@storybook/nextjs";
import CommentList from "./CommentList";

const meta = {
  title: "공통 컴포넌트/CommentList",
  component: CommentList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 목 데이터
const mockComments = [
  {
    id: 1,
    author: "김철수",
    date: "2024.10.30",
    content: "정말 유익한 글이네요! 많은 도움이 되었습니다.",
    replyTo: undefined,
  },
  {
    id: 2,
    author: "이영희",
    date: "2024.10.30",
    content: "저도 동감합니다. 특히 두 번째 부분이 인상깊었어요.",
    replyTo: "김철수",
  },
  {
    id: 3,
    author: "박민수",
    date: "2024.10.30",
    content: "좋은 정보 감사합니다!",
    replyTo: "김철수",
  },
  {
    id: 4,
    author: "최지훈",
    date: "2024.10.29",
    content: "다음 글도 기대하겠습니다.",
    replyTo: undefined,
  },
  {
    id: 5,
    author: "정수진",
    date: "2024.10.29",
    content: "저도 그렇게 생각해요!",
    replyTo: "최지훈",
  },
];

// 기본 스토리
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
  args: {
    comments: mockComments,
  },
};

// 원댓글만 있는 경우
export const OnlyParentComments: Story = {
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
  args: {
    comments: [
      {
        id: 1,
        author: "김철수",
        date: "2024.10.30",
        content: "정말 유익한 글이네요!",
        replyTo: undefined,
      },
      {
        id: 2,
        author: "이영희",
        date: "2024.10.30",
        content: "좋은 정보 감사합니다.",
        replyTo: undefined,
      },
      {
        id: 3,
        author: "박민수",
        date: "2024.10.29",
        content: "다음 글도 기대하겠습니다.",
        replyTo: undefined,
      },
    ],
  },
};

// 대댓글이 많은 경우
export const ManyReplies: Story = {
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
  args: {
    comments: [
      {
        id: 1,
        author: "김철수",
        date: "2024.10.30",
        content: "정말 유익한 글이네요!",
        replyTo: undefined,
      },
      {
        id: 2,
        author: "이영희",
        date: "2024.10.30",
        content: "저도 동감합니다.",
        replyTo: "김철수",
      },
      {
        id: 3,
        author: "박민수",
        date: "2024.10.30",
        content: "좋은 정보 감사합니다!",
        replyTo: "김철수",
      },
      {
        id: 4,
        author: "최지훈",
        date: "2024.10.30",
        content: "저도 그렇게 생각해요.",
        replyTo: "김철수",
      },
      {
        id: 5,
        author: "정수진",
        date: "2024.10.30",
        content: "완전 공감합니다!",
        replyTo: "김철수",
      },
      {
        id: 6,
        author: "강호동",
        date: "2024.10.30",
        content: "도움이 많이 되었어요.",
        replyTo: "김철수",
      },
    ],
  },
};

// 긴 내용의 댓글
export const LongContent: Story = {
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
  args: {
    comments: [
      {
        id: 1,
        author: "김철수",
        date: "2024.10.30",
        content:
          "정말 유익한 글이네요! 특히 첫 번째 부분에서 설명하신 내용이 매우 인상깊었습니다. 저도 비슷한 경험이 있어서 공감이 많이 되었어요. 앞으로도 이런 좋은 글 부탁드립니다. 감사합니다!",
        replyTo: undefined,
      },
      {
        id: 2,
        author: "이영희",
        date: "2024.10.30",
        content:
          "저도 동감합니다. 이 주제에 대해 많은 생각을 하게 되었어요. 특히 두 번째 파트에서 언급하신 부분은 제가 미처 생각하지 못했던 관점이었습니다.",
        replyTo: "김철수",
      },
    ],
  },
};

// 단일 댓글 스레드
export const SingleThread: Story = {
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
  args: {
    comments: [
      {
        id: 1,
        author: "김철수",
        date: "2024.10.30",
        content: "좋은 글입니다!",
        replyTo: undefined,
      },
    ],
  },
};
