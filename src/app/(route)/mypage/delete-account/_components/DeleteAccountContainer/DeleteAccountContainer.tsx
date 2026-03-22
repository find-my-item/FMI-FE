"use client";

import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import DeleteAccountReason from "../DeleteAccountReason/DeleteAccountReason";
import DeleteAccountPassword from "../DeleteAccountPassword/DeleteAccountPassword";

interface DeleteUserType {
  reason: string;
  otherReason?: string;
}

const DeleteAccountContainer = () => {
  const methods = useForm<DeleteUserType>({ mode: "onChange", reValidateMode: "onChange" });

  const searchParams = useSearchParams();
  const state = searchParams.get("state") || "reason";

  return (
    <section>
      <h2 className="sr-only">탈퇴 선택 영역</h2>
      <FormProvider {...methods}>
        <form>
          {state === "reason" && <DeleteAccountReason />}

          {state === "passwordConfirm" && <DeleteAccountPassword />}
        </form>
      </FormProvider>
    </section>
  );
};

export default DeleteAccountContainer;
