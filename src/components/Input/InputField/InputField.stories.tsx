import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "공통 컴포넌트/Input/InputField",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
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

export const Default: Story = {
  args: {
    label: "테스트",
    name: "테스트",
    validation: { maxLength: { value: 20, message: "최대길이는 20자입니다." } },
    placeholder: "20자 이내로 입력해주세요.",
    rule: "caption",
  },
};

export const disabled: Story = {
  args: {
    label: "테스트",
    name: "테스트",
    validation: { required: true, maxLength: { value: 20, message: "최대길이는 20자입니다." } },
    placeholder: "20자 이내로 입력해주세요.",
    rule: "caption",
    disabled: true,
  },
};
