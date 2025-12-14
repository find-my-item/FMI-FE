"use client";
"use no memo";

import { DetailHeader } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { FormValue } from "../types/FormValue";
import FindPwForm from "./components/FindPwForm";

const Page = () => {
  const methods = useForm<FormValue>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  return (
    <FormProvider {...methods}>
      <DetailHeader title="비밀번호 찾기" />
      <FindPwForm />
    </FormProvider>
  );
};

export default Page;
