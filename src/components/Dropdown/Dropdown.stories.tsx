"use client";

import { Meta, StoryObj } from "@storybook/nextjs";
import Dropdown from "./Dropdown";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSelect: { control: "text" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
];

export const Basic: Story = {
  args: {
    options: defaultOptions,
    onSelect: () => {},
  },
  render: (args) => {
    return <Dropdown {...args} />;
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
      { value: "4", label: "Option 4" },
      { value: "5", label: "Option 5" },
    ],
    onSelect: () => {},
  },
  render: (args) => {
    return <Dropdown {...args} />;
  },
};
