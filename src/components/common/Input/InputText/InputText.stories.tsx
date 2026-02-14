import type { Meta, StoryObj } from "@storybook/nextjs";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "./InputText";

const meta: Meta<typeof InputText> = {
  title: "공통컴포넌트/Input/InputText",
  component: InputText,
  decorators: [
    (Story) => {
      const methods = useForm({ mode: "onChange" });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    label: "아이디(이메일)",
    inputOption: {
      name: "email",
      placeholder: "이메일 주소를 입력해주세요",
      type: "text",
    },
    caption: {
      rule: "형식에 맞는 이메일 주소를 입력해야 합니다.",
    },
  },
};

export const PasswordToggle: Story = {
  args: {
    label: "비밀번호",
    inputOption: {
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
    },
    caption: {
      rule: "8~16자 영문 대소문자, 숫자, 특수문자 포함",
    },
  },
};

export const WithActionButton: Story = {
  args: {
    label: "닉네임",
    inputOption: {
      name: "nickname",
      placeholder: "사용할 닉네임 입력",
    },
    btnOption: {
      btnLabel: "중복확인",
      btnOnClick: (value) => console.log(`${value} 중복 체크 API 호출`),
    },
  },
};

export const ErrorState: Story = {
  args: {
    label: "에러 필드",
    inputOption: {
      name: "errorField",
    },
    caption: {
      rule: "이 필드는 에러 상태를 보여줍니다.",
    },
  },
};

export const SuccessState: Story = {
  args: {
    label: "검증 완료",
    inputOption: {
      name: "successField",
      defaultValue: "VerifiedValue",
    },
    caption: {
      isSuccess: true,
      successMessage: "성공적으로 인증되었습니다.",
    },
  },
};

export const DisabledState: Story = {
  args: {
    label: "읽기 전용",
    inputOption: {
      name: "readOnlyField",
      disabled: true,
      defaultValue: "admin@company.com",
    },
    btnOption: {
      btnLabel: "발송완료",
      disabled: true,
    },
  },
};
