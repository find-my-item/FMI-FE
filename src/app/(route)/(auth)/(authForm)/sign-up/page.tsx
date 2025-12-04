"use client";
"use no memo";

import { FormProvider, useForm } from "react-hook-form";
import { FormType } from "../types/FormType";
import SignUpContainer from "./_components/SignUpContainer/SignUpContainer";

const Page = () => {
  const methods = useForm<FormType>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  return (
    <div className="flex min-h-screen w-full flex-col-center">
      <FormProvider {...methods}>
        <SignUpContainer />
      </FormProvider>
    </div>
  );
};

export default Page;
