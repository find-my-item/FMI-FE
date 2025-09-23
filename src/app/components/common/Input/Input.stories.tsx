"use client";

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { within, userEvent, expect } from "@storybook/test";
import Input from "./Input";

type FormValue = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

const FormDecorator = (defaultValues?: Partial<FormValue>) => (StoryFn: React.ComponentType) => {
  const methods = useForm<FormValue>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
      ...defaultValues,
    },
  });
  return (
    <FormProvider {...methods}>
      <form style={{ display: "grid", gap: 12, width: 360 }}>
        <StoryFn />
        {/* 제출 버튼(테스트/컨트롤 확인용) */}
        <button type="submit" style={{ padding: "8px 12px" }}>
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  argTypes: {
    inputStyle: { control: "text" },
    id: {
      control: "radio",
      options: ["email", "password", "passwordConfirm", "nickname"],
    },
    type: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  decorators: [FormDecorator()],
  args: {
    inputStyle: "Default",
    id: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력해주세요",
    required: true,
    validation: {
      pattern: {
        // 간단 예시 패턴
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "유효한 이메일 주소가 아닙니다.",
      },
    },
  },
};

// 2) 비밀번호 입력 필드
export const Password: Story = {
  decorators: [FormDecorator()],
  args: {
    inputStyle: "w-[330px] h-[40px] px-3 py-3 m-2 border rounded-[3px]",
    id: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호 (8~16자, 영문+숫자)",
    required: true,
    validation: {
      pattern: {
        // 영문+숫자, 8~16자
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
        message: "영문+숫자 조합 8~16자로 입력하세요.",
      },
    },
  },
};

// 3) 비밀번호 + 비밀번호 확인(동일 폼 컨텍스트)
//    하나의 스토리에서 두 컴포넌트를 렌더합니다.
export const PasswordWithConfirm: Story = {
  decorators: [
    FormDecorator({
      password: "", // 초기값
      passwordConfirm: "",
    }),
  ],
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        {/* 비밀번호 */}
        <Input
          inputStyle={args.inputStyle ?? "w-[330px] h-[40px] px-3 py-3 m-2 border rounded-[3px]"}
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호 (8~16자, 영문+숫자)"
          required
          validation={{
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
              message: "영문+숫자 조합 8~16자로 입력하세요.",
            },
          }}
        />
        {/* 비밀번호 확인: react-hook-form의 register validate 콜백으로 일치 검사 */}
        <Input
          inputStyle={args.inputStyle ?? "w-[330px] h-[40px] px-3 py-3 m-2 border rounded-[3px]"}
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          required
          validation={{
            validate: (value: string, formValues?: FormValue) =>
              value === (formValues?.password ?? "") || "비밀번호가 일치하지 않습니다.",
          }}
        />
      </div>
    );
  },
  args: {
    // 공통 스타일만 args에서 조정 가능하게
    inputStyle: "w-[330px] h-[40px] px-3 py-3 m-2 border rounded-[3px]",
  },
  // 간단한 인터랙션 테스트: 불일치 → 에러 메시지 확인
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // 첫 번째 인풋(비밀번호)에 값 입력
    const pwd = canvas.getByLabelText("비밀번호");
    await userEvent.type(pwd, "abc12345");

    // 두 번째 인풋(비밀번호 확인)에 다른 값 입력 후 blur
    const pwd2 = canvas.getByLabelText("비밀번호 확인");
    await userEvent.type(pwd2, "abc12346");
    await userEvent.tab(); // blur 유도

    // 에러 메시지 노출 확인
    // (컴포넌트에 위 '에러 메시지 한 줄' 패치가 되어 있어야 보입니다)
    const err = await canvas.findByText("비밀번호가 일치하지 않습니다.");
    await expect(err).toBeInTheDocument();
  },
};
