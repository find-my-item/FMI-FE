"use client";

import { useSearchParams } from "next/navigation";
import DeleteAccountReason from "../DeleteAccountReason/DeleteAccountReason";
import { InputText } from "@/components/common";

const PasswordConfirm = () => {
  return (
    <div>
      <InputText name="passwordConfirm" />
    </div>
  );
};

const DeleteAccountContainer = () => {
  const searchParams = useSearchParams();

  const state = searchParams.get("state") || "reason";

  return (
    <section>
      <h2 className="sr-only">탈퇴 선택 영역</h2>
      <form>
        {state === "reason" && <DeleteAccountReason />}

        {state === "passwordConfirm" && <PasswordConfirm />}
      </form>
    </section>
  );
};

export default DeleteAccountContainer;
