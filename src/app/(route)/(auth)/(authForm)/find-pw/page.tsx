"use client";

import { useFormContext } from "react-hook-form";
import { Button, InputText } from "@/components";
import { ButtonStyle } from "../../_constant/authStyle";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";

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
        // TODO(수현): div에 스타일을 적용하는게 아닌, p 태그에 div 스타일 적용 및 div 태그 제거
        <div className="h-[91px] text-center text-body2-regular flex-col-center">
          <p>
            <span className="text-flatGreen-500">{email}</span>으로
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
          className={cn(ButtonStyle, isValid && "bg-fill-brand-normal-default")}
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
