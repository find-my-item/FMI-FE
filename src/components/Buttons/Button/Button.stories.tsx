import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import Icon from "@/components/Icon/Icon";

const meta = {
  title: "공통 컴포넌트/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outlined", "inversed"],
      description: "버튼의 스타일 variant",
    },
    hierarchy: {
      control: "select",
      options: ["normal", "subtle"],
      description: "solid variant의 계층 구조",
    },
    size: {
      control: "select",
      options: ["big", "medium", "small"],
      description: "버튼의 크기",
    },
    iconPosition: {
      control: "select",
      options: ["leading", "trailing"],
      description: "아이콘 위치",
    },
    icon: {
      control: "select",
      options: [<Icon name="ArrowRight" size={16} />, ""],
      description: "아이콘",
    },
    loading: {
      control: "boolean",
      description: "로딩 상태",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "solid",
    hierarchy: "normal",
    size: "medium",
  },
};

// With Icons
export const WithLeadingIcon: Story = {
  args: {
    children: "With Icon",
    iconPosition: "leading",
    icon: { name: "ArrowRight", size: 16 },
  },
};

export const WithTrailingIcon: Story = {
  args: {
    children: "With Icon",
    iconPosition: "trailing",
    icon: { name: "ArrowRight", size: 16 },
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    loading: true,
    size: "big",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

// All Variants Comparison
export const AllVariants: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="solid" hierarchy="normal">
          Solid Normal
        </Button>
        <Button variant="solid" hierarchy="subtle">
          Solid Subtle
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outlined">Outlined</Button>
        <div className="rounded bg-gray-800 p-4">
          <Button variant="inversed">Inversed</Button>
        </div>
      </div>
    </div>
  ),
};
