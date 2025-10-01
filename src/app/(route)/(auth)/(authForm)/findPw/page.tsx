"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { ButtonStyle, InputStyle } from "../../styles/authStyle";
import { cn } from "@/utils/cn";

const Page = () => {
  return (
    <div className="flex-col-center w-full gap-4 px-5 py-6">
      <input
        type="text"
        placeholder="아이디(이메일)을 입력해 주세요."
        className={InputStyle}
        name="findPw"
      />
      <Button children="입력완료" className={cn(ButtonStyle, "text-white")} />
    </div>
  );
};

export default Page;
