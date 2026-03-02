import type { Meta, StoryObj } from "@storybook/nextjs";
import SnackBar from "./SnackBar";

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
      <div className="">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
