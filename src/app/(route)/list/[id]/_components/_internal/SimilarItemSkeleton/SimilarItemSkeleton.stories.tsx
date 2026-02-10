import { Meta, StoryObj } from "@storybook/nextjs";
import SimilarItemSkeleton from "./SimilarItemSkeleton";

const meta: Meta<typeof SimilarItemSkeleton> = {
  title: "페이지/상세 페이지/SimilarItemSkeleton",
  component: SimilarItemSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const Multiple: Story = {
  decorators: [
    (Story) => (
      <div className="hide-scrollbar flex w-[450px] snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="snap-start">
            <Story />
          </div>
        ))}
      </div>
    ),
  ],
};
