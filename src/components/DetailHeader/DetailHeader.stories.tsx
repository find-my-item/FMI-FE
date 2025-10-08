import type { Meta, StoryObj } from "@storybook/react";
import DetailHeader from "./DetailHeader";

const meta: Meta<typeof DetailHeader> = {
  title: "공통 컴포넌트/DetailHeader",
  component: DetailHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "상세페이지 상단에 표시되는 헤더 컴포넌트.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "헤더 제목" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "475px", border: "1px solid #ccc" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DetailHeader>;

export const Default: Story = {
  args: {
    title: "유실물 발생 시 매뉴얼",
  },
};
