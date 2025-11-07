"use client";

import { Meta, StoryObj } from "@storybook/nextjs";
import Label from "./Label";

const meta: Meta<typeof Label> = {
  title: "공통 컴포넌트/Input/_Internal/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "이메일(아이디)",
    name: "email",
    required: true,
  },
};

export const noRequired: Story = {
  args: {
    label: "이메일(아이디)",
    name: "email",
    required: false,
  },
};
