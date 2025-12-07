import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
import Button from "./Button";
import Icon from "../../Icon/Icon";

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
      options: ["solid", "outlined", "inversed", "auth"],
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
    ignoreBase: {
      control: "boolean",
      description: "기본 스타일 제거 여부",
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
      <div className="flex gap-4">
        <Button variant="auth">Auth</Button>
      </div>
    </div>
  ),
};

// As Link Component
export const AsLink: Story = {
  args: {
    children: "Link Button",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button as={Link} href="/about" ignoreBase>
          <Icon name="Book" size={24} />
        </Button>
        <Button as={Link} href="/contact" variant="outlined">
          Outlined Link
        </Button>
      </div>
      <div className="flex gap-4">
        <Button
          as={Link}
          href="/products"
          variant="solid"
          hierarchy="normal"
          icon={{ name: "ArrowRight", size: 16 }}
          iconPosition="trailing"
        >
          Link with Icon
        </Button>
      </div>
    </div>
  ),
};
