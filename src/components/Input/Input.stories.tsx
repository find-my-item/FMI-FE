import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "공통 컴포넌트/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
  },
  decorators: [
    (Story, context) => {
      const methods = useForm();

      return (
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    name: "email",
    label: "이메일",
    type: "text",
    placeholder: "이메일을 입력해주세요",
    className: "px-3 py-3 w-[480px] h-[46px]",
  },
};

export const Password: Story = {
  args: {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    className: "px-3 py-3 w-[480px] h-[46px]",
  },
};
