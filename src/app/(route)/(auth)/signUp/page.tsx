"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormValue, signUpInputObject } from "../types/FormData";
import Input from "@/app/components/common/Input/Input";
import Button from "@/app/components/common/Button/Button";

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
            <Input {...item} />
          </div>
        ))}
        <Button children="회원가입" type="submit" style="bg-slate-400 w-50 h-30" />
      </form>
    </FormProvider>
  );
};

export default Page;
