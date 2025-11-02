// src/components/Icon/Icon.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs";
import Icon from "./Icon";
import * as Icons from "./index";

const iconOptions = Object.keys(Icons) as Array<keyof typeof Icons>;

const meta: Meta<typeof Icon> = {
  title: "아이콘/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    name: {
      control: "select",
      options: iconOptions,
      description: "표시할 아이콘 이름",
    },
    size: {
      control: { type: "number" },
      description: "아이콘 크기(px)",
      defaultValue: 24,
    },
    title: {
      control: "text",
      description: "접근성용 레이블",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스(Tailwind 포함)",
    },
    // 필요 시 직접 색상 지정도 가능
    fill: {
      control: "color",
      description: "SVG fill 색상(hex)",
      table: { category: "SVG Props" },
    },
    stroke: {
      control: "color",
      description: "SVG stroke 색상(hex)",
      table: { category: "SVG Props" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

// 1) 기본 예시
export const Default: Story = {
  args: {
    name: iconOptions[0],
    size: 24,
    title: "icon",
  },
};

// 3) 아이콘 차트: 전체 아이콘 미리보기
export const IconChart: Story = {
  render: () => (
    <div className="p-4">
      <h3 className="mb-4 text-center text-xl font-bold">아이콘 차트</h3>
      <div className="mx-auto grid max-w-6xl grid-cols-6 gap-4">
        {iconOptions.map((iconName) => (
          <div
            key={iconName}
            className="flex flex-col items-center rounded-lg border border-gray-200 p-3 transition-shadow hover:shadow-md"
          >
            <Icon name={iconName} size={24} className="mb-2" />
            <span className="break-words text-center text-xs text-gray-600">{iconName}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "모든 아이콘을 그리드로 확인합니다.",
      },
    },
  },
};

// 4) 색상/스타일 프리셋 예시
export const ColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-6">
      <div>
        <Icon name="EyeOpen" size={30} />
        <span>기본</span>
      </div>
      <div>
        <Icon name="EyeOpen" size={30} className="fill-none stroke-none" />
        <span>fill-none stroke-none</span>
      </div>
      <div>
        <Icon name="EyeOpen" size={30} className="fill-blue-500 stroke-none" />
        <span>fill-blue-500 stroke-none</span>
      </div>
      <div>
        <Icon name="EyeOpen" size={30} className="fill-none stroke-blue-500" />
        <span>fill-none stroke-blue-500</span>
      </div>
      <div>
        <Icon name="EyeOpen" size={30} className="stroke-blue-500 text-blue-500" />
        <span>stroke-blue-500 text-blue-500</span>
      </div>
    </div>
  ),
};
