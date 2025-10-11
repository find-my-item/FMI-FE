import { Meta } from "@storybook/nextjs";
import ListItem from "./ListItem";

const meta: Meta<typeof ListItem> = {
  title: "페이지/목록 페이지/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[430px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const ListItemStory = () => (
  <ListItem
    img="/test_list.JPG"
    title="게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목"
    description="서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다"
  />
);
