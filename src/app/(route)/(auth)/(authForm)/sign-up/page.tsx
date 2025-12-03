"use client";
"use no memo";

// import { AllAgree, DetailAgree, SignUpField } from "./_components";
// import { useSignUpFlow } from "./_hooks/useSignUpFlow";
import { FormProvider, useForm } from "react-hook-form";
import { FormType } from "../types/FormType";
// import { ApiSignUpType } from "../types/ApiSingUpType";
import { useRouter } from "next/navigation";
import SignUpContainer from "./_components/SignUpContainer/SignUpContainer";

const Page = () => {
  const methods = useForm<FormType>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false, // 입력 값 유지
  });

  const router = useRouter();

  // const handleFinalSubmit = (data: FormType) => {
  //   console.log("최종 제출 데이터:", data);
  //   alert("폼 제출되었습니다.");
  //   router.push("/email-login");
  // };

  return (
    <div className="flex min-h-screen w-full flex-col-center">
      <FormProvider {...methods}>
        <SignUpContainer />
        {/* <SignUpContainer onFinalSubmit={handleFinalSubmit} /> */}
      </FormProvider>
    </div>
  );
};

export default Page;
