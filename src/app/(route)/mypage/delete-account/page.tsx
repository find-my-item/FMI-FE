"use client";

import { DetailHeader } from "@/components/layout";
import { DeleteAccountContainer, DeleteComplete } from "./_components";
import { Suspense, useEffect, useState } from "react";
import { DeleteAccountType, useDeleteAccount } from "@/api/fetch/user";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";

const page = () => {
  const methods = useForm<DeleteAccountType>({ mode: "onChange", reValidateMode: "onChange" });
  const { addToast } = useToast();

  const [isDeleted, setIsDeleted] = useState(false);
  const { mutate: DeleteAccountMutate, isPending } = useDeleteAccount();

  // useEffect(() => {
  //   const savedReasons = sessionStorage.getItem("reasons");
  //   const savedOther = sessionStorage.getItem("other_reason");

  //   if (savedReasons) {
  //     methods.reset({
  //       reasons: JSON.parse(savedReasons),
  //       otherReason: savedOther || ""
  //     });
  //   }
  // }, [methods.reset]);

  const onSubmit = (data: DeleteAccountType) => {
    const savedReasons = sessionStorage.getItem("reasons");
    const savedOther = sessionStorage.getItem("other_reason");
    if (isPending) return;

    const payload: DeleteAccountType = {
      reasons: data.reasons,
    };

    if (data.reasons?.includes("OTHER") && data.otherReason && data.otherReason.trim() !== "") {
      payload.otherReason = data.otherReason;
    }

    DeleteAccountMutate(payload, {
      onSuccess: () => {
        setIsDeleted(true);
        sessionStorage.removeItem("reasons");
        sessionStorage.removeItem("otherReason");
      },
      onError: (error) => {
        if (error.code === "USER404-NOT_FOUND") addToast("존제하지 않는 회원이에요", "warning");
        else if (error.code === "FILE500-DELETE_IO") addToast("회원탈퇴에 실패했어요", "warning");
      },
    });

    console.log("payload>> ", payload);
    console.log("데이터 확인>> ", savedReasons);
    console.log("데이터 확인>> ", savedOther);
  };

  if (isDeleted) {
    return <DeleteComplete />;
  }

  return (
    <>
      <DetailHeader title="회원 탈퇴" />
      <h1 className="sr-only">회원탈퇴 페이지</h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <Suspense fallback="">
            <DeleteAccountContainer />
          </Suspense>
        </form>
      </FormProvider>
    </>
  );
};

export default page;
