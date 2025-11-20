"use client";
"use no memo";

import { Button, DetailHeader, InputText } from "@/components";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { FormValue } from "../types/FormValue";

const Page = () => {
  const methods = useForm<FormValue>({
    mode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
    watch,
  } = useForm();

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
    <FormProvider {...methods}>
      <DetailHeader title="비밀번호 찾기" />
      <form
        className="flex h-[191px] min-h-screen w-full flex-col gap-[10px] px-5 py-[30px]"
        onSubmit={onSubmit}
      >
        {isSubmitSuccessful ? (
          <>
            <p className="flex h-[77px] flex-col justify-center text-center text-body2-regular">
              <span>
                <span className="text-flatGreen-500">{email}</span> 으로
              </span>
              임시 비밀번호를 발송했습니다.
            </p>
            <Button
              type="button"
              className="w-[318px]"
              onClick={handleClick}
              ariaLabel={isSubmitSuccessful ? "로그인 화면으로 이동" : "입력완료"}
            >
              {isSubmitSuccessful ? "로그인 화면으로 이동" : "입력완료"}
            </Button>
          </>
        ) : (
          <InputText
            label="아이디(이메일)"
            type="text"
            placeholder="아이디(이메일)을 입력해 주세요."
            name="email"
            validation={{ required: true }}
            btnType="submit"
          >
            비밀번호 찾기
          </InputText>
        )}
      </form>
    </FormProvider>
  );
};

export default Page;
