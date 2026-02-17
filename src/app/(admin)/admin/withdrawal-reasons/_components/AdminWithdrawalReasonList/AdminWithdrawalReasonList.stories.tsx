import type { Meta, StoryObj } from "@storybook/nextjs";
import AdminWithdrawalReasonList from "./AdminWithdrawalReasonList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/providers/ToastProviders";

const queryClient = new QueryClient();

const meta: Meta<typeof AdminWithdrawalReasonList> = {
  title: "관리자 페이지/탈퇴사유 관리/AdminWithdrawalReasonList",
  component: AdminWithdrawalReasonList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "탈퇴사유 관리 페이지 리스트 컴포넌트",
      },
    },
  },

  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <div className="w-[390px] border">
            <Story />
          </div>
        </ToastProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminWithdrawalReasonList>;

export const Default: Story = {};
