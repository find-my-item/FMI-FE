import { Meta, StoryObj } from "@storybook/nextjs";
import ProfileAvatar from "./ProfileAvatar";

export default {
  title: "공통 컴포넌트/ProfileAvatar",
  component: ProfileAvatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ProfileAvatar>;

export const Default: StoryObj<typeof ProfileAvatar> = {
  args: {
    src: "",
    alt: "프로필",
    size: 60,
  },
};
