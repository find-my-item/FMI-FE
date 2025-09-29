"use client";

import { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import Tab from "./Tab";

const meta = {
  title: "Components/Tab",
  component: Tab,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selected: { control: "text" },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
];

export const Basic: Story = {
  args: {
    tabs: defaultTabs,
    selected: "1",
    onValueChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.selected ?? "1");
    return <Tab {...args} selected={value} onValueChange={setValue} />;
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: "1", label: "Option 1" },
      { id: "2", label: "Option 2" },
      { id: "3", label: "Option 3" },
    ],
    selected: "1",
    onValueChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.selected ?? "1");
    return <Tab {...args} selected={value} onValueChange={setValue} />;
  },
};
