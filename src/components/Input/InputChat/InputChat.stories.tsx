import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import InputChat from "./InputChat";

const meta: Meta<typeof InputChat> = {
  title: "공통 컴포넌트/InputChat",
  component: InputChat,
  tags: ["autodocs"],
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
    name: "테스트",
  },
};

export const disabled: Story = {
  args: {
    name: "테스트",
    disabled: true,
  },
};
