"use client";

import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import DeleteAccountReason from "../DeleteAccountReason/DeleteAccountReason";
import DeleteAccountPassword from "../DeleteAccountPassword/DeleteAccountPassword";
import { DeleteAccountType, useDeleteAccount } from "@/api/fetch/user";

const DeleteAccountContainer = () => {
  const methods = useForm<DeleteAccountType>({ mode: "onChange", reValidateMode: "onChange" });

  const searchParams = useSearchParams();
  const state = searchParams.get("state") || "reason";

  const { mutate: DeleteAccountMutate } = useDeleteAccount();

  const onSubmit = (data: DeleteAccountType) => {
    console.log("data>> ", data);
  };

  return (
    <section>
      <h2 className="sr-only">탈퇴 선택 영역</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {state === "reason" && <DeleteAccountReason />}

          {state === "passwordConfirm" && <DeleteAccountPassword />}
        </form>
      </FormProvider>
    </section>
  );
};

export default DeleteAccountContainer;
