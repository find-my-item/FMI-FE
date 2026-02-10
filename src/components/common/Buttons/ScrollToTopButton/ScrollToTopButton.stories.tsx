import type { Meta, StoryObj } from "@storybook/nextjs";
import ScrollToTopButton from "./ScrollToTopButton";

const meta = {
  title: "공통 컴포넌트/ScrollToTopButton",
  component: ScrollToTopButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "스크롤 시 노출되는 맨 위로 이동 버튼입니다. 스크롤이 상단 200px 이내일 때는 자동으로 숨겨지며, `onHide`로 강제 숨김할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onHide: {
      control: "boolean",
      description: "true일 경우 스크롤 위치와 관계없이 버튼을 숨깁니다.",
    },
  },
  decorators: [
    (Story) => (
      <div className="h-[50dvh] w-full">
        <div className="p-4">
          <p className="text-sm text-gray-500">
            캔버스를 아래로 스크롤하면 우측 하단에 버튼이 나타납니다. (상단 200px 이내에서는
            숨겨집니다)
          </p>
        </div>
        <div className="fixed bottom-6 right-6">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollToTopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Hidden: Story = {
  args: {
    onHide: true,
  },
  parameters: {
    docs: {
      description: {
        story: "onHide가 true일 때 스크롤 위치와 관계없이 버튼이 보이지 않습니다.",
      },
    },
  },
};
