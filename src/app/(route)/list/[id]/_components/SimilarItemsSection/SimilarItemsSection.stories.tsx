import { Meta, StoryObj } from "@storybook/nextjs";
import SimilarItemsSection from "./SimilarItemsSection";

const meta: Meta<typeof SimilarItemsSection> = {
  title: "Components/Detail/SimilarItemsSection",
  component: SimilarItemsSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
