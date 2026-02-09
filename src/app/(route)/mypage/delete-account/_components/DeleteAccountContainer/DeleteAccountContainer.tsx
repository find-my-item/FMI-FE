"use client";

import { useSearchParams } from "next/navigation";
import { InputText } from "@/components/common";
import { FormProvider, useForm } from "react-hook-form";
import { FooterButton } from "@/components/domain";
import DeleteAccountReason from "../DeleteAccountReason/DeleteAccountReason";

const PasswordConfirm = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-[18px] px-5 py-[30px] h-base">
        <h3 className="text-h3-semibold text-[#171717]">비밀번호를 입력해 주세요.</h3>
        {/* TODO(수현): 디자인 업데이트 시 placeholder 변경예정 */}
        <InputText
          name="passwordConfirm"
          type="password"
          placeholder="현재 비밀번호를 입력해 주세요."
        />
      </div>

      <FooterButton label="탈퇴하기" />
    </>
  );
};

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

          {state === "passwordConfirm" && <PasswordConfirm />}
        </form>
      </FormProvider>
    </section>
  );
};

export default DeleteAccountContainer;
