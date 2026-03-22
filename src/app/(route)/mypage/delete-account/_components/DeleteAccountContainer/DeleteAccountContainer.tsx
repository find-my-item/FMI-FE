"use client";
"use no memo";

import { useSearchParams } from "next/navigation";
import DeleteAccountReason from "../DeleteAccountReason/DeleteAccountReason";
import DeleteAccountPassword from "../DeleteAccountPassword/DeleteAccountPassword";

const DeleteAccountContainer = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") || "reason";

  return (
    <section>
      <h2 className="sr-only">탈퇴 선택 영역</h2>
      {state === "reason" && <DeleteAccountReason />}

      {state === "passwordConfirm" && <DeleteAccountPassword />}
    </section>
  );
};

export default DeleteAccountContainer;
