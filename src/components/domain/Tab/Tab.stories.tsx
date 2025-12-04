"use client";

import type { StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import Tab from "./Tab";

const meta = {
  title: "공통 컴포넌트/Tab",
  component: Tab,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selected: { control: "text" },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { key: "1", label: "Opt 1" },
  { key: "2", label: "Opt 2" },
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
      { key: "1", label: "Opt 1" },
      { key: "2", label: "Opt 2" },
      { key: "3", label: "Opt 3" },
      { key: "4", label: "Opt 4" },
      { key: "5", label: "Opt 5" },
    ],
    selected: "1",
    onValueChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.selected ?? "1");
    return <Tab {...args} selected={value} onValueChange={setValue} />;
  },
};
