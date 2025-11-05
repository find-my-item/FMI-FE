import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import InputSearch from "./InputSearch";

const meta: Meta<typeof InputSearch> = {
  title: "공통 컴포넌트/InputSearch",
  component: InputSearch,
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
    placeholder: "검색어를 입력해주세요.",
    mode: "RHF",
  },
};

export const disabled: Story = {
  args: {
    name: "테스트",
    placeholder: "검색어를 입력해주세요.",
    mode: "RHF",
    disabled: true,
  },
};
