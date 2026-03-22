"use client";

import { DetailHeader } from "@/components/layout";
import { DeleteAccountContainer, DeleteComplete } from "./_components";
import { Suspense, useState } from "react";
import { DeleteAccountType, useDeleteAccount } from "@/api/fetch/user";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";

const page = () => {
  const methods = useForm<DeleteAccountType>({ mode: "onChange", reValidateMode: "onChange" });
  const { addToast } = useToast();

  const [isDeleted, setIsDeleted] = useState(false);
  const { mutate: DeleteAccountMutate } = useDeleteAccount();

  const onSubmit = (data: DeleteAccountType) => {
    DeleteAccountMutate(
      { reason: data.reason },
      {
        onSuccess: () => {
          setIsDeleted(true);
        },
        onError: () => addToast("회원탈퇴에 실패했어요", "warning"),
      }
    );
  };

  if (isDeleted) {
    return <DeleteComplete />;
  }

  return (
    <>
      <DetailHeader title="회원 탈퇴" />
      <h1 className="sr-only">회원탈퇴 페이지</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Suspense fallback="">
            <DeleteAccountContainer />
          </Suspense>
        </form>
      </FormProvider>
    </>
  );
};

export default page;
