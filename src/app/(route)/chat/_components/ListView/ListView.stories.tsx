import { Meta, StoryObj } from "@storybook/nextjs";
import ListView from "./ListView";

const meta: Meta<typeof ListView> = {
  title: "페이지/채팅 페이지/ListView",
  component: ListView,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "채팅 목록을 표시하는 뷰 컴포넌트입니다. 검색 모드에 따라 다른 UI를 렌더링합니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[430px] border border-gray-200">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ListView>;

export const Default: Story = {
  render: () => {
    // searchMode가 "default"인 경우 (기본값)
    // .storybook/mock/next-navigation.ts에서 이미 빈 URLSearchParams를 반환하므로
    // 기본적으로 "default" 모드가 됩니다.
    return <ListView />;
  },
};
