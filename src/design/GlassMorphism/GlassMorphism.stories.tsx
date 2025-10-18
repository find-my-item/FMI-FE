import { Meta, StoryObj } from "@storybook/nextjs";
import GlassMorphism from "./GlassMorphism";
import GlassMorphismButton from "./GlassMorphismButton";

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
        <GlassMorphismButton isDisabled={false}>다음</GlassMorphismButton>
        <GlassMorphismButton isDisabled={true}>대기중</GlassMorphismButton>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
