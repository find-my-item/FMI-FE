import { Meta, StoryObj } from "@storybook/nextjs";
import ListItemImage from "./ListItemImage";

export default {
  title: "공통 컴포넌트/ListItemImage",
  component: ListItemImage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ListItemImage>;

export const Default: StoryObj<typeof ListItemImage> = {
  args: {
    src: "/test_list.JPG",
    alt: "프로필",
    size: 120,
  },
};

export const WithImageCount: StoryObj<typeof ListItemImage> = {
  args: {
    src: "/test_list.JPG",
    alt: "프로필",
    size: 120,
    imageCount: 5,
  },
};
