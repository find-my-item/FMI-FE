import { Meta, StoryObj } from "@storybook/nextjs";
import GlassMorphism from "./GlassMorphism";

const meta: Meta<typeof GlassMorphism> = {
  title: "Design/GlassMorphism",
  component: GlassMorphism,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full flex-col-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
