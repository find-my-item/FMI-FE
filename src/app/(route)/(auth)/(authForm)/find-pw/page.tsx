"use client";

import { useFormContext } from "react-hook-form";
import { Button, InputText } from "@/components";
import { ButtonStyle } from "../../_constant/authStyle";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isValid, isSubmitSuccessful },
    watch,
  } = useFormContext();

  const email = watch("email");

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  const handleClick = () => {
    if (isSubmitSuccessful) {
      router.push("/login");
    }
  };

  return (
    <form className="w-full gap-4 px-5 py-6 flex-col-center" onSubmit={onSubmit}>
      {isSubmitSuccessful ? (
        <div className="h-[91px] text-center text-[14px] leading-relaxed flex-col-center">
          <p>
            <span className="text-[#1EB87B]">{email}</span>으로
            <br />
            임시 비밀번호를 발송했습니다.
          </p>
        </div>
      ) : (
        <InputText
          label="아이디(이메일)"
          type="text"
          placeholder="아이디(이메일)을 입력해 주세요."
          name="email"
          validation={{ required: true }}
        >
          비밀번호 찾기
        </InputText>
      )}
      {isSubmitSuccessful && (
        <Button
          type="button"
          className={cn(ButtonStyle, isValid && "bg-[#1EB87B]")}
          onClick={handleClick}
          ariaLabel={isSubmitSuccessful ? "로그인 화면으로 이동" : "입력완료"}
        >
          {isSubmitSuccessful ? "로그인 화면으로 이동" : "입력완료"}
        </Button>
      )}
    </form>
  );
};

export default Page;
