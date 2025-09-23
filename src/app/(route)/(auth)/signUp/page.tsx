"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormValue, signUpInputObject } from "../types/FormData";
import Input from "@/app/components/common/Input/Input";
import Button from "@/app/components/common/Button/Button";

const InputStyle = "w-[330px] h-[40px] px-3 py-3 m-2 border rounded-[3px]";

const Page = () => {
  const methods = useForm<FormValue>();

  const onSubmit = (data: any) => {
    alert("폼 제출되었습니다.");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {signUpInputObject.map((item) => (
          <div key={item.id}>
            <Input
              inputStyle={InputStyle}
              id={item.id}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              required={item.required}
              validation={item.validation}
            />
          </div>
        ))}
        <Button name="회원가입" bnType="submit" bnStyle="bg-slate-400 w-50 h-30" />
      </form>
    </FormProvider>
  );
};

export default Page;
