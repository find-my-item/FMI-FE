// src/components/Input/input.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import { within, userEvent, expect } from "@storybook/test";
import Input from "./Input";
import { FormValue } from "../../../(route)/(auth)/constant/FormData";

const meta: Meta<typeof Input> = {
  title: "Components/Form/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
  },

  decorators: [
    (Story) => {
      const methods = useForm<FormValue>({
        mode: "onChange",
      });
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
  parameters: {
    // 레이아웃을 중앙으로 설정하여 보기 좋게 만듭니다.
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "email",
    type: "email",
    style: "border rounded px-3 py-2 w-64",
    placeholder: "이메일을 입력하세요.",
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    id: "email",
    label: "이메일 주소",
  },
};
