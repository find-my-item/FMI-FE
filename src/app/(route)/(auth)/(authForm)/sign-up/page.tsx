"use client";
"use no memo";

import { FormProvider, useForm } from "react-hook-form";
import { FormValue } from "../types/FormValue";
import { useRouter } from "next/navigation";
import SignUpContainer from "./_components/SignUpContainer/SignUpContainer";
import { Suspense } from "react";

const Page = () => {
  const methods = useForm<FormValue>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  const router = useRouter();

  const handleFinalSubmit = (data: FormValue) => {
    alert("폼 제출되었습니다.");
    router.push("/email-login");
  };

  return (
    <div className="flex min-h-screen w-full flex-col-center">
      <FormProvider {...methods}>
        <Suspense fallback={""}>
          <SignUpContainer onFinalSubmit={handleFinalSubmit} />
        </Suspense>
      </FormProvider>
    </div>
  );
};

export default Page;
