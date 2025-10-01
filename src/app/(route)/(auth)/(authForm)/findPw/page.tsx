"use client";

import { useFormContext } from "react-hook-form";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { ButtonStyle, InputStyle } from "../../styles/authStyle";
import { cn } from "@/utils/cn";

const Page = () => {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  return (
    <form className="flex-col-center w-full gap-4 px-5 py-6" onSubmit={onSubmit}>
      <Input
        className={InputStyle}
        type="text"
        placeholder="아이디(이메일)을 입력해 주세요."
        name="findPw"
        validation={{
          required: "이메일은 필수 항목 입니다",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            message: "이메일 형식이 올바르지 않습니다",
          },
        }}
      />
      <Button
        children="입력완료"
        type="submit"
        className={cn(ButtonStyle, isValid && "bg-[#1EB87B]")}
      />
    </form>
  );
};

export default Page;
