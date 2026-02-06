import type { Meta, StoryObj } from "@storybook/nextjs";
import CommentList from "./CommentList";
import { MOCK_COMMENT_LIST_DATA } from "@/mock/data";

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
  args: {
    comments: MOCK_COMMENT_LIST_DATA,
  },
};
