// src/components/Input/input.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import { within, userEvent, expect } from "@storybook/test";
import Input from "./Input";
import { FormValue } from "../../../(route)/(auth)/types/FormData";

const meta: Meta<typeof Input> = {
  title: "Components/Form/Input", // Storybook 사이드바에 표시될 경로
  component: Input,
  tags: ["autodocs"], // 컴포넌트 문서를 자동으로 생성합니다.
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
  },
  // !! 중요 !!
  // Input 컴포넌트가 useFormContext를 사용하므로 모든 스토리를 FormProvider로 감싸줍니다.
  decorators: [
    (Story) => {
      const methods = useForm<FormValue>({
        mode: "onChange", // 혹은 'onBlur' 등 필요에 맞게 설정
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

// 1. 기본 스토리 (Default)
export const Default: Story = {
  args: {
    id: "email",
    type: "email",
    style: "border rounded px-3 py-2 w-64",
    placeholder: "이메일을 입력하세요.",
  },
};

// 2. 레이블이 있는 스토리
export const WithLabel: Story = {
  args: {
    ...Default.args,
    id: "email",
    label: "이메일 주소",
  },
};

// 3. 유효성 검사 에러를 테스트하는 스토리
export const ValidationError: Story = {
  args: {
    id: "email",
    type: "email",
    label: "이메일 (필수)",
    style: "border rounded px-3 py-2 w-64",
    placeholder: "잘못된 이메일 입력 후 포커스 아웃",
    validation: {
      required: "이메일은 필수 입력 항목입니다.",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "유효한 이메일 형식이 아닙니다.",
      },
    },
  },
  // play 함수: 사용자 인터랙션을 시뮬레이션합니다.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 'Email (Required)' 레이블을 가진 input 필드를 찾습니다.
    const emailInput = canvas.getByLabelText("이메일 (필수)");

    // 유효하지 않은 텍스트를 입력합니다.
    await userEvent.type(emailInput, "invalid-email", {
      delay: 100,
    });

    // Tab 키를 눌러 input에서 포커스를 벗어나게 합니다. (onBlur 트리거)
    await userEvent.tab();

    // 에러 메시지가 화면에 나타나는지 확인합니다.
    const errorMessage = await canvas.findByText("유효한 이메일 형식이 아닙니다.");
    await expect(errorMessage).toBeInTheDocument();
  },
};

// 4. 비밀번호 확인 기능 테스트를 위한 스토리들
const PasswordConfirmationTemplate: Story = {
  // 비밀번호/비밀번호 확인 스토리는 2개의 Input이 필요하므로 render 함수를 사용합니다.
  render: (args) => (
    <div className="space-y-4">
      <Input
        id="password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호 입력"
        style="border rounded px-3 py-2 w-64"
        validation={{
          required: "비밀번호는 필수입니다.",
          minLength: { value: 8, message: "8자 이상 입력해주세요." },
        }}
      />
      {/* args로 받은 props를 passwordConfirm 필드에 전달합니다. */}
      <Input
        {...args}
        id="passwordConfirm"
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호 다시 입력"
        style="border rounded px-3 py-2 w-64"
      />
    </div>
  ),
};

// 4-1. 비밀번호 확인 성공 케이스
export const PasswordConfirmSuccess: Story = {
  ...PasswordConfirmationTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByLabelText("비밀번호");
    const passwordConfirmInput = canvas.getByLabelText("비밀번호 확인");

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(passwordConfirmInput, "password123");
    await userEvent.tab();

    // 에러 메시지가 없는지 확인합니다.
    const errorMessage = canvas.queryByText("비밀번호가 일치하지 않습니다.");
    await expect(errorMessage).not.toBeInTheDocument();
  },
};

// 4-2. 비밀번호 확인 실패 케이스
export const PasswordConfirmError: Story = {
  ...PasswordConfirmationTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByLabelText("비밀번호");
    const passwordConfirmInput = canvas.getByLabelText("비밀번호 확인");

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(passwordConfirmInput, "wrongpassword"); // 다른 비밀번호 입력
    await userEvent.tab(); // onBlur 트리거

    // 에러 메시지가 나타나는지 확인합니다.
    const errorMessage = await canvas.findByText("비밀번호가 일치하지 않습니다.");
    await expect(errorMessage).toBeInTheDocument();
  },
};
