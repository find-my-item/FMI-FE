import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import InputComment from "./InputComment";
import { ComposeInputProvider } from "@/providers/ComposeInputProvider";

const meta: Meta<typeof InputComment> = {
  title: "공통 컴포넌트/Input/InputComment",
  component: InputComment,
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
    name: "content",
  },
};

export const Disabled: Story = {
  args: {
    name: "content",
    disabled: true,
  },
};
