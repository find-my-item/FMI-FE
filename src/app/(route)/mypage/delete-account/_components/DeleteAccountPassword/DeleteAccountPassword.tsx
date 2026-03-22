"use client";
"use no memo";

import { usePostVerifyPassword } from "@/api/fetch/user";
import { Button, InputText } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";
import { FooterButton } from "@/components/domain";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const DeleteAccountPassword = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();
  const { getValues } = useFormContext();
  const { mutate: VerifyPasswordMutate } = usePostVerifyPassword();

  const handleToClick = () => {
    const currentPassword = getValues("passwordConfirm");
    console.log("password>> ", currentPassword);
    VerifyPasswordMutate(
      { currentPassword },
      {
        onSuccess: () => {
          setModalOpen(true);
        },
        onError: (error) => {
          if (error.code === "USER400-PASSWORD_INCORRECT") {
            addToast("비밀번호가 일치하지 않아요", "warning");
          } else if (error.code === "USER404-NOT_FOUND")
            addToast("존재하지 않는 회원이에요", "warning");
        },
      }
    );
  };

  return (
    <>
      <div className="flex w-full flex-col gap-[18px] px-5 py-[30px] h-base">
        <h3 className="text-h3-semibold text-[#171717]">비밀번호를 입력해 주세요.</h3>

        <InputText
          inputOption={{
            name: "passwordConfirm",
            type: "password",
            placeholder: "현재 비밀번호를 입력해 주세요.",
          }}
        />
      </div>

      <FooterButton onClick={handleToClick}>탈퇴하기</FooterButton>

      {modalOpen && (
        <ModalLayout
          className="w-[350px] gap-6 p-6 flex-col-center"
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <h3 className="text-h3-semibold text-layout-header-default">정말로 탈퇴하시겠습니까?</h3>

          <div className="flex w-full gap-2">
            <Button variant="outlined" className="w-full" onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button type="submit" className="w-full !bg-system-warning">
              탈퇴하기
            </Button>
          </div>
        </ModalLayout>
      )}
    </>
  );
};

export default DeleteAccountPassword;
