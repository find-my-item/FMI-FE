"use client";
"use no memo";

import DeleteAccountReason from "../DeleteAccountReason/DeleteAccountReason";
import DeleteAccountPassword from "../DeleteAccountPassword/DeleteAccountPassword";
import { useState } from "react";

const DeleteAccountContainer = () => {
  const [state, setState] = useState<number>(1);
  return (
    <section>
      <h2 className="sr-only">탈퇴 선택 영역</h2>
      {state === 1 && <DeleteAccountReason onNext={() => setState(2)} />}

      {state === 2 && <DeleteAccountPassword onBack={() => setState(1)} />}
    </section>
  );
};

export default DeleteAccountContainer;
