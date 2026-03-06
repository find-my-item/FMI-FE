import { Meta, StoryObj } from "@storybook/nextjs";
import WriteImageSection from "./WriteImageSection";
import { ToastProvider } from "@/providers/ToastProviders";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof WriteImageSection> = {
  title: "공통 컴포넌트/WriteImageSection",
  component: WriteImageSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      const methods = useForm();
      return (
        <ToastProvider>
          <FormProvider {...methods}>
            <div className="w-[390px]">
              <Story />
            </div>
          </FormProvider>
        </ToastProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
