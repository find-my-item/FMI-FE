"use client";

import { Meta, StoryObj } from "@storybook/nextjs";
import ModalLayout from "./ModalLayout";

const meta = {
  title: "공통 컴포넌트/Modal",
  component: ModalLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ModalLayout>;

export default meta;
type Story = StoryObj<typeof ModalLayout>;

export const Basic: Story = {
  args: {
    isOpen: true,
  },
};

export const WithTitle: Story = {
  args: {
    isOpen: true,
    className: "p-4 flex-center",
    children: <h2>Modal Title</h2>,
  },
};

export const WithContent: Story = {
  args: {
    isOpen: true,
    className: "p-4 flex-center",
    children: (
      <>
        <h2>Modal Title</h2>
        <p className="flex-center h-[100px]">Modal Content</p>
        <span>Modal Footer</span>
        <button
          className="mouse-hover mt-4 rounded border border-gray-300 px-4 py-2 hover:border-gray-500 hover:text-black"
          onClick={() => alert("Closed")}
        >
          Close
        </button>
      </>
    ),
  },
};
