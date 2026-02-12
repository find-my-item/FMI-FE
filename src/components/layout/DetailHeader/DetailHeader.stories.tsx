import type { Meta, StoryObj } from "@storybook/nextjs";
import DetailHeader from "./DetailHeader";
import {
  DetailHeaderMenu,
  DetailHeaderSave,
  DetailHeaderSearch,
  DetailHeaderShare,
  DetailHeaderStar,
} from "./DetailHeaderParts";

const meta: Meta<typeof DetailHeader> = {
  title: "공통 컴포넌트/DetailHeader",
  component: DetailHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "상세페이지 상단에 표시되는 헤더 컴포넌트입니다. 뒤로가기 버튼과 다양한 액션 버튼을 포함할 수 있습니다.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "헤더 제목" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "475px", border: "1px solid #ccc", padding: "8px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DetailHeader>;

export const Default: Story = {};

export const WithText: Story = {
  args: {
    title: "유실물 발생 시 매뉴얼",
  },
};

export const Write: Story = {
  args: {
    title: "분실했어요 글쓰기",
    children: (
      <div className="flex gap-[23.5px]">
        <DetailHeaderSave disabled={false} />
      </div>
    ),
  },
};

export const List: Story = {
  args: {
    title: "게시글",
    children: (
      <div className="flex gap-[23.5px]">
        <DetailHeaderSearch />
      </div>
    ),
  },
};

export const PostDetail: Story = {
  args: {
    children: (
      <div className="flex gap-[23.5px]">
        {/* storybook에서 사이즈 작게 뜨는 버그 */}
        <DetailHeaderStar isActive />
        <DetailHeaderShare />
        <DetailHeaderMenu />
      </div>
    ),
  },
};
