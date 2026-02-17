import type { Meta, StoryObj } from "@storybook/nextjs";
import AdminMenuSection from "./AdminMenuSection";

const meta: Meta<typeof AdminMenuSection> = {
  title: "관리자 페이지/메인 페이지/AdminMenuSection",
  component: AdminMenuSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "관리자 메뉴 섹션 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[390px] border">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminMenuSection>;

export const Default: Story = {};
