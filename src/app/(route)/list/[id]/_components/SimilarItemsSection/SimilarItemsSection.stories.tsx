import { Meta, StoryObj } from "@storybook/nextjs";
import SimilarItemsSection from "./SimilarItemsSection";

const meta: Meta<typeof SimilarItemsSection> = {
  title: "페이지/상세 페이지/SimilarItemsSection",
  component: SimilarItemsSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
