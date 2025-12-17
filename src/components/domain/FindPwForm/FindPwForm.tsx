"use client";

import { useFormContext } from "react-hook-form";
import { Button, InputText } from "@/components";
import { cn } from "@/utils";
import Link from "next/link";
import { useFindPwSubmit } from "@/hooks";
import { ApiFindPwType } from "@/types";

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
          type="email"
          placeholder="아이디(이메일)을 입력해 주세요."
          name="email"
          validation={{
            required: true,
            maxLength: 254,
            minLength: 6,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식을 입력해주세요.",
            },
          }}
          btnType="submit"
        >
          비밀번호 찾기
        </InputText>
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
