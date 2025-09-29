"use client";

import { FormProvider, useForm } from "react-hook-form";
import { FormValue, signUpInputObject } from "../constant/FormData";
import Input from "@/app/components/common/Input/Input";
import Button from "@/app/components/common/Button/Button";
import { InputStyle } from "../styles/authStyle";

const Page = () => {
  const methods = useForm<FormValue>({
    mode: "onBlur",
  });

  const onSubmit = (data: FormValue) => {
    alert("폼 제출되었습니다.");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {signUpInputObject.map((item) => (
          <Input
            key={item.name}
            name={item.name}
            type={item.type}
            className={InputStyle}
            label={item.label}
            placeholder={item.placeholder}
            validation={item.validation}
          />
        ))}
        <Button
          children="회원가입"
          type="submit"
          className="bg-slate-400 w-50 h-30"
          label="회원가입 버튼"
        />
      </form>
    </FormProvider>
  );
};

export default Page;
