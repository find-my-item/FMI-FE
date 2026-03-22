"use client";

import { Button, InputText } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";
import { FooterButton } from "@/components/domain";
import { useState } from "react";

const DeleteAccountPassword = () => {
  const [modalOpen, setModalOpen] = useState(false);
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

      <FooterButton onClick={() => console.log("비밀번호 검증 버튼")}>탈퇴하기</FooterButton>
      {modalOpen && (
        <ModalLayout
          className="w-[350px] gap-6 p-6 flex-col-center"
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <h3 className="text-h3-semibold text-layout-header-default">정말로 탈퇴하시겠습니까?</h3>

          <div className="flex w-full gap-2">
            <Button variant="outlined" className="w-full">
              취소
            </Button>
            <Button className="w-full !bg-system-warning">탈퇴하기</Button>
          </div>
        </ModalLayout>
      )}
    </>
  );
};

export default DeleteAccountPassword;
