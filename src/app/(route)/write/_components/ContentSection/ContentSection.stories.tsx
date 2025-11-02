import { Meta, StoryObj } from "@storybook/nextjs";
import ContentSection from "./ContentSection";

const meta: Meta<typeof ContentSection> = {
  title: "페이지/글쓰기/ContentSection",
  component: ContentSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <form className="w-[390px]">
        <Story />
      </form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
