import { Meta, StoryObj } from "@storybook/nextjs";
import ActionSection from "./ActionSection";

const meta: Meta<typeof ActionSection> = {
  title: "페이지/글쓰기/ActionSection",
  component: ActionSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <form onSubmit={() => {}} className="w-[390px]">
        <Story />
      </form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
