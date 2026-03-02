import type { Meta, StoryObj } from "@storybook/nextjs";
import SnackBar from "./SnackBar";
import { SnackBarProvider } from "@/providers/SnackBarProviders";
import { useSnackBar } from "@/context/SnackBarContext";

const meta: Meta<typeof SnackBar> = {
  title: "공통 컴포넌트/SnackBar",
  component: SnackBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    message: "유저를 차단했어요",
    actionLabel: "차단 목록으로 이동",
    actionHandler: () => {},
  },
  decorators: [
    (Story) => (
      <SnackBarProvider>
        <div className="">
          <Story />
        </div>
      </SnackBarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SnackBarAnimation: Story = {
  render: () => {
    const { showSnackBar } = useSnackBar();

    return (
      <div className="flex h-[500px] w-[500px] flex-col justify-between border-2 p-4">
        <button onClick={() => showSnackBar("유저를 차단했어요", "차단 목록으로 이동", () => {})}>
          스낵바 띄우기
        </button>
        {/* <SnackBar
          message="유저를 차단했어요"
          actionLabel="차단 목록으로 이동"
          actionHandler={() => {}}
        /> */}
      </div>
    );
  },
};
