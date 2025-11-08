import type { Meta, StoryObj } from "@storybook/react";
import ImageSelectButton from "./ImageSelectButton";
import { ComponentProps, useState } from "react";
import { ChatRoomProvider } from "@/app/(route)/chat/[roomId]/_components/ChatRoomProvider/ChatRoomProvider";

type ImageSelectButtonProps = ComponentProps<typeof ImageSelectButton>;

const meta = {
  title: "공통 컴포넌트/ImageSelectButton",
  component: ImageSelectButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: { type: "number" },
      description: "버튼 간 간격(px)",
    },
    ariaLabel: {
      control: "text",
      description: "접근성을 위한 라벨",
    },
  },
} satisfies Meta<typeof ImageSelectButton>;

export default meta;
type Story = StoryObj<ImageSelectButtonProps>;

// Base64 이미지 데이터 (작은 샘플 이미지들)
const base64Images = [
  // 빨간색 사각형
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC",
  // 파란색 사각형
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAAhKDveksOjmAAAAAElFTkSuQmCC",
  // 초록색 사각형
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNkYPhfz0AEYBxVSF+FAP5FDvcfRYWgAAAAAElFTkSuQmCC",
];

// Base64를 File 객체로 변환
const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Base64 이미지로 File 객체 생성
const createMockImagesFromBase64 = (): File[] => {
  return base64Images.map((base64, index) => base64ToFile(base64, `image${index + 1}.png`));
};

// 래퍼 컴포넌트
const ImageSelectButtonWrapper = (args: ImageSelectButtonProps) => {
  const [mockImages] = useState<File[]>(() => createMockImagesFromBase64());

  return (
    <ChatRoomProvider initialImages={mockImages}>
      <ImageSelectButton {...args} />
    </ChatRoomProvider>
  );
};

export const Default: Story = {
  render: (args) => <ImageSelectButtonWrapper {...args} />,
  args: {
    gap: 8,
    ariaLabel: "이미지 선택",
  },
};
