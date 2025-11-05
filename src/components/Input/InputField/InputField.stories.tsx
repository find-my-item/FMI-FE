import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "공통 컴포넌트/InputField",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    validation: { control: "object" },
  },
  decorators: [
    (Story, context) => {
      const methods = useForm();

      return (
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} className="w-[480px]">
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
    label: "아이디(이메일)",
    name: "email",
    validation: { required: true, maxLength: { value: 10, message: "최대길이는 10자입니다." } },
    type: "text",
    placeholder: "이메일을 입력해주세요",
    rule: "이메일은 필수 항목입니다.",
  },
};

export const Password: Story = {
  args: {
    label: "비밀번호",
    name: "password",
    validation: { required: false },
    type: "password",
    placeholder: "비밀번호를 입력하세요",
  },
};
