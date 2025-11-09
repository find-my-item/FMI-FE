import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import InputChat from "./InputChat";
import { ChatRoomProvider } from "@/providers/ChatRoomProvider";

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
        <ChatRoomProvider>
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} className="w-[480px]">
              <Story />
            </form>
          </FormProvider>
        </ChatRoomProvider>
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
