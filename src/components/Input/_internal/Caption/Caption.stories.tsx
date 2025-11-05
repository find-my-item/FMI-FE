"use client";

import { Meta, StoryObj } from "@storybook/nextjs";
import Caption from "./Caption";

const meta: Meta<typeof Caption> = {
  title: "공통 컴포넌트/Input/Internal/Cation",
  component: Caption,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const errorMessage: Story = {
  args: {
    hasError: true,
    errorMessage: "필수 입력 항목입니다.",
  },
};
export const successMessage: Story = {
  args: {
    isSuccess: true,
    successMessage: "인증되었습니다.",
  },
};
export const ruleMessage: Story = {
  args: {
    rule: "2~10자 이내",
  },
};
