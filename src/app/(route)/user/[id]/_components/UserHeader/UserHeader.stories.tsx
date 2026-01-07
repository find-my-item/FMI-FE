import { Meta, StoryObj } from "@storybook/nextjs";
import UserHeader from "./UserHeader";

const meta: Meta<typeof UserHeader> = {
  title: "페이지/타인 페이지/UserHeader",
  component: UserHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px] shadow-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      nickname: "사용자 닉네임",
      email: "asdf@gmail.com",
    },
  },
};
