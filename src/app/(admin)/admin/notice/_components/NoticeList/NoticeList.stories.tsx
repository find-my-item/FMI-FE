import type { Meta, StoryObj } from "@storybook/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NoticeList from "./NoticeList";

const queryClient = new QueryClient();

const meta: Meta<typeof NoticeList> = {
  title: "관리자 페이지/공지사항 관리/NoticeList",
  component: NoticeList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "공지사항 관리 페이지 리스트 컴포넌트",
      },
    },
  },

  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="w-[390px] border">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NoticeList>;

export const Default: Story = {};
