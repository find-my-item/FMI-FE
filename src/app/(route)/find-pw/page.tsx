"use client";
"use no memo";

import { ApiFindPwType } from "@/api/fetch/auth";
import { DetailHeader } from "@/components/layout";
import { FindPwForm } from "@/components";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const methods = useForm<ApiFindPwType>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  return (
    <FormProvider {...methods}>
      <DetailHeader title="비밀번호 찾기" />
      <FindPwForm text="로그인" redirectLink="/login" />
    </FormProvider>
  );
};

export default Page;
