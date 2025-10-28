import { Meta, StoryObj } from "@storybook/nextjs";
import ImageSection from "./ImageSection";

const meta: Meta<typeof ImageSection> = {
  title: "페이지/글쓰기/ImageSection",
  component: ImageSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[390px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
