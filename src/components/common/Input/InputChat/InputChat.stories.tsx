import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import InputChat from "./InputChat";
import { ComposeInputProvider } from "@/providers/ComposeInputProvider";

const meta: Meta<typeof InputChat> = {
  title: "공통 컴포넌트/Input/InputChat",
  component: InputChat,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      const methods = useForm();

      return (
        <ComposeInputProvider>
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} className="w-[480px]">
              <Story />
            </form>
          </FormProvider>
        </ComposeInputProvider>
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
