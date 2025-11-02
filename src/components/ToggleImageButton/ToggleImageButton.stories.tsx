// ToggleImageButton.stories.tsx
import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ToggleImageButton from "./ToggleImageButton";

const meta = {
  title: "공통 컴포넌트/ToggleImageButton",
  component: ToggleImageButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    toggleState: {
      control: "boolean",
      description: "선택된 이미지 상태 (true: 첫 번째 이미지 선택, false: 두 번째 이미지 선택)",
      defaultValue: true,
    },
    position: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "버튼 배열 방향",
      defaultValue: "horizontal",
    },
    gap: {
      control: { type: "number" },
      description: "버튼 간 간격(px)",
      defaultValue: 8,
    },
    ariaLabel: {
      control: "text",
      description: "접근성을 위한 라벨",
      defaultValue: "이미지 토글 버튼",
    },
  },
} satisfies Meta<typeof ToggleImageButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [toggleState, setToggleState] = useState(args.toggleState);
    const images = [
      "https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg",
      "https://i.namu.wiki/i/slmFMXb1Fchs2zN0ZGOzqfuPDvhRS-H9eBp7Gp613-DNKi6i6Ct7eFkTUpauqv5HAYR97mrNqrvvcCDEyBdL_g.webp",
    ];

    // Controls에서 toggleState 변경 시 내부 상태 동기화
    useEffect(() => {
      setToggleState(args.toggleState);
    }, [args.toggleState]);

    return (
      <ToggleImageButton
        {...args}
        images={images}
        toggleState={toggleState}
        onClick={() => setToggleState((prev) => !prev)}
      />
    );
  },
  args: {
    images: ["/img1.png", "/img2.png"],
    toggleState: true,
    position: "horizontal",
    gap: 8,
    ariaLabel: "프로필 이미지 선택",
  },
};
