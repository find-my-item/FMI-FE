import type { Meta, StoryObj } from "@storybook/nextjs";
import CheckBox from "./CheckBox";

const meta: Meta<typeof CheckBox> = {
  title: "공통 컴포넌트/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  args: {
    id: "agree",
    label: "전체 약관 동의",
    state: false,
  },
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {};

export const CustomChecked: Story = {
  args: {
    id: "allTerms",
    label: "전체 동의",
    state: false,
    boxSize: "w-[18px] h-[18px]",
    textStyle: "text-[12px] ml-2",
    iconSize: "h-[6px]",
  },
};
