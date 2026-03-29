"use client";
"use no memo";

import { usePostVerifyPassword } from "@/api/fetch/user";
import { Button, InputText } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";
import { FooterButton } from "@/components/domain";
import { useToast } from "@/context/ToastContext";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const DeleteAccountPassword = ({ onBack }: { onBack: () => void }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();
  const {
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { isSubmitting },
  } = useFormContext();
  const { mutate: VerifyPasswordMutate, isPending } = usePostVerifyPassword();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleToClick = () => {
    const currentPassword = getValues("passwordConfirm");
    VerifyPasswordMutate(
      { currentPassword },
      {
        onSuccess: () => {
          setModalOpen(true);
        },
        onError: (error) => {
          const errorCode = error.response?.data.code;

          if (errorCode === "USER400-PASSWORD_INCORRECT") {
            setError("passwordConfirm", {
              message: "비밀번호가 일치하지 않아요.",
            });
            addToast("비밀번호가 일치하지 않아요", "warning");
          } else if (errorCode === "USER404-NOT_FOUND")
            setError("passwordConfirm", {
              message: "존재하지 않는 회원이에요.",
            });
          addToast("존재하지 않는 회원이에요", "warning");
        },
      }
    );
  };

  const passwordValue = watch("passwordConfirm")?.trim() || "";

  return (
    <>
      <div className="flex w-full flex-col gap-[18px] px-5 py-[30px] h-hf-base">
        <h3 className="text-h3-semibold text-[#171717]">비밀번호를 입력해 주세요.</h3>

        <InputText
          inputOption={{
            name: "passwordConfirm",
            type: "password",
            placeholder: "현재 비밀번호를 입력해 주세요.",
            onKeyDown: (e) => {
              if (e.key === " ") e.preventDefault();
            },
          }}
        />
      </div>

      <FooterButton onClick={handleToClick} disabled={passwordValue.length === 0 || isPending}>
        탈퇴하기
      </FooterButton>

      {modalOpen && (
        <ModalLayout
          className="w-[350px] gap-6 rounded-[8px] p-6 flex-col-center"
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <h3 className="text-h3-semibold text-layout-header-default">정말로 탈퇴하시겠습니까?</h3>

          <div className="flex w-full gap-2">
            <Button
              variant="outlined"
              size="big"
              className="w-full"
              onClick={() => {
                setModalOpen(false);
                onBack();
              }}
            >
              취소
            </Button>
            <Button
              size="big"
              onClick={() => {
                handleSubmit((data) => {
                  const formElement = document.querySelector("form");
                  formElement?.requestSubmit();
                })();
              }}
              loading={isSubmitting}
              className="w-full !bg-system-warning"
            >
              탈퇴하기
            </Button>
          </div>
        </ModalLayout>
      )}
    </>
  );
};

export default DeleteAccountPassword;
