import { Meta, StoryObj } from "@storybook/nextjs";
import TitleSection from "./TitleSection";

const meta: Meta<typeof TitleSection> = {
  title: "페이지/글쓰기/TitleSection",
  component: TitleSection,
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
