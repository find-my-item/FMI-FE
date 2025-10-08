"use client";

import { useFormContext } from "react-hook-form";
import { signUpInputObject } from "../../_constant/FormData";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { cn } from "@/utils/cn";
import { ButtonStyle } from "../../_constant/authStyle";

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
        <div className="w-full flex-1 gap-5 p-5">
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
                    className={item.className}
                    placeholder={item.placeholder}
                    validation={item.validation}
                  />
                  {item.name == "emailAuth" && (
                    <Button className={cn(ButtonStyle, "bg-[#1EB87B]")}>인증번호 발송</Button>
                  )}
                  {item.name == "nickname" && (
                    <Button className={cn(ButtonStyle, "bg-[#1EB87B]")}>중복 확인</Button>
                  )}
                </div>
                {item.name == "emailAuth" && <Button>인증번호 확인</Button>}
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
        <div className="fixed bottom-0 left-0 min-h-[102px] w-full px-8 py-3">
          <Button type="submit" label="회원가입 버튼" className={cn(ButtonStyle, "")}>
            다음
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
