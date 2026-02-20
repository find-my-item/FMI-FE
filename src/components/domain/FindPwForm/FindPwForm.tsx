"use client";

import { useFormContext } from "react-hook-form";
import { Button, InputText } from "@/components/common";
import { cn } from "@/utils";
import Link from "next/link";
import { useFindPwSubmit } from "@/hooks/domain";
import { ApiFindPwType } from "@/api/fetch/auth";

interface FindPwFormProps {
  text: string;
  redirectLink: string;
}

const FindPwForm = ({ text, redirectLink }: FindPwFormProps) => {
  const { handleSubmit } = useFormContext<ApiFindPwType>();
  const { onSubmitFindPassword, email } = useFindPwSubmit();

  return (
    <form
      className={cn("flex min-h-screen w-full flex-col gap-[10px] px-5 py-[64px]", email && "px-9")}
      noValidate
      onSubmit={handleSubmit(onSubmitFindPassword)}
    >
      {!email ? (
        <InputText
          label="아이디(이메일)"
          inputOption={{
            name: "email",
            type: "email",
            placeholder: "아이디(이메일)을 입력해 주세요.",
            validation: {
              required: "이메일은 필수 입력 항목입니다.",
              maxLength: { value: 254, message: "이메일이 너무 깁니다." },
              minLength: { value: 6, message: "최소 6자 이상 입력해주세요." },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "이메일 형식을 입력해주세요.",
              },
            },
          }}
          btnOption={{
            btnLabel: "발송",
            btnType: "submit",
          }}
        />
      ) : (
        <>
          <p className="flex flex-col items-center py-[18.5px] text-center text-body2-regular">
            <span className="flex items-center justify-center">
              <span className="inline-block max-w-[200px] truncate text-flatGreen-500">
                {email}
              </span>
              으로 <br />
            </span>
            임시 비밀번호를 발송했습니다.
          </p>
          <Button as={Link} href={redirectLink} className="w-full" ariaLabel="로그인 화면으로 이동">
            {text}
          </Button>
        </>
      )}
    </form>
  );
};

export default FindPwForm;
