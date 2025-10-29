"use client";

import { Meta, StoryObj } from "@storybook/nextjs";
import PopupLayout from "./PopupLayout";

const meta = {
  title: "공통 컴포넌트/PopupLayout",
  component: PopupLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PopupLayout>;

export default meta;
type Story = StoryObj<typeof PopupLayout>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => alert("닫기"),
    className: "p-4 flex-col-center",
    children: (
      <>
        <h2>팝업 제목</h2>
        <p className="h-[100px] flex-center">팝업 내용</p>
        <span>팝업 푸터</span>
        <button
          className="mt-4 rounded border border-gray-300 px-4 py-2 mouse-hover hover:border-gray-500 hover:text-black"
          onClick={() => alert("닫기")}
        >
          닫기
        </button>
      </>
    ),
  },
};
