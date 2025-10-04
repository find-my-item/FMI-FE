"use client";

import { useFormContext } from "react-hook-form";
import { signUpInputObject } from "../../_constant/FormData";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const Page = () => {
  const { handleSubmit } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    alert("폼 제출되었습니다.");
  });

  return (
    <div className="flex-col-center flex min-h-screen w-full md:flex-row">
      <form onSubmit={onSubmit} className="flex-col-center w-full gap-5 p-5">
        {signUpInputObject.map((item) => (
          <div className="w-full">
            <Input
              key={item.name}
              name={item.name}
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
              validation={item.validation}
            />
          </div>
        ))}
        <Button type="submit" label="회원가입 버튼">
          다음
        </Button>
      </form>
    </div>
  );
};

export default Page;
