import type { Meta, StoryObj } from "@storybook/nextjs";
import ViewMoreComment from "./ViewMoreComment";

const meta = {
  title: "공통 컴포넌트/ViewMoreComment",
  component: ViewMoreComment,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    count: {
      control: "number",
      description: "총 댓글 수",
    },
    onClick: {
      action: "clicked",
      description: "댓글 더보기 버튼 클릭 시 실행할 함수",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[390px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ViewMoreComment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 5,
    onClick: () => alert("댓글 더보기"),
  },
};

export const Zero: Story = {
  args: {
    count: 0,
  },
};
