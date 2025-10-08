"use client";

import { useFormContext } from "react-hook-form";
import { signUpInputObject } from "../../_constant/FormData";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { cn } from "@/utils/cn";
import { ButtonStyle, InputStyle, signUpButtonStyle } from "../../_constant/authStyle";

const Page = () => {
  const {
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  return (
    <div className="flex-col-center flex min-h-screen w-full md:flex-row">
      <form onSubmit={onSubmit} className="flex w-full flex-col justify-between">
        <div className="w-full flex-1 gap-5 p-4">
          {signUpInputObject.map((item) => {
            const fieldError = errors[item.name]?.message as string;
            const showError = (!!touchedFields[item.name] || isSubmitted) && !!fieldError;
            return (
              <div className="flex w-full flex-col gap-3">
                <div className="flex min-h-[106px] w-full flex-row items-end gap-[10px]">
                  <Input
                    key={item.name}
                    name={item.name}
                    label={item.label}
                    type={item.type}
                    className={cn(InputStyle, showError && "border-[#FF4242]")}
                    placeholder={item.placeholder}
                    validation={item.validation}
                  />
                  {item.name == "email" && (
                    <Button className={signUpButtonStyle}>인증번호 발송</Button>
                  )}
                  {item.name == "emailAuth" && (
                    <Button className={signUpButtonStyle}>인증번호 확인</Button>
                  )}
                  {item.name == "nickname" && (
                    <Button className={cn(signUpButtonStyle, "min-w-[100px]")}>중복 확인</Button>
                  )}
                </div>

                {/* 에러 확인 및 규칙 안내 */}
                {(showError || item.rule) && (
                  <p
                    className={cn(
                      "mt-1 text-[12px]",
                      showError ? "text-red-500" : "text-[#787878]"
                    )}
                  >
                    {showError ? fieldError : item.rule}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <hr className="fixed bottom-[102px] left-0 h-px w-full bg-[#E4E4E4]" />
        <div className="fixed bottom-0 min-h-[102px] min-w-[390px] px-4 py-3">
          <Button type="submit" label="회원가입 버튼">
            다음
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
