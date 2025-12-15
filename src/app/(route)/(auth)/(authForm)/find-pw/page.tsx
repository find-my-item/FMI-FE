"use client";
"use no memo";

import { DetailHeader } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import FindPwForm from "./_components/FindPwForm";

const Page = () => {
  const methods = useForm<{ email: string }>({
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
