import { InputText } from "@/components/common";
import { FooterButton } from "@/components/domain";
import { CHANGE_PASSWORD_CONFIG } from "../../_constants/CHANGE_PASSWORD_CONFIG";
import { usePostVerifyPassword } from "@/api/fetch/user";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

interface ChangePasswordFormType {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const ChangePasswordForm = () => {
  const { getValues, handleSubmit } = useFormContext<ChangePasswordFormType>();
  const { mutateAsync } = usePostVerifyPassword();

  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<"success" | "error" | null>(null);

  const handleVerifyPassword = async () => {
    const currentPassword = getValues("currentPassword");

    try {
      await mutateAsync({ currentPassword });

      setVerifyStatus("success");
      setVerifyMessage("비밀번호가 확인되었습니다.");
    } catch {
      setVerifyStatus("error");
      setVerifyMessage("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <form className="flex h-dvh flex-col" onSubmit={handleSubmit(() => {})}>
      <fieldset className="flex w-full flex-col gap-5 px-5 py-[30px]">
        <legend className="sr-only">비밀번호 변경 정보 입력</legend>

        {CHANGE_PASSWORD_CONFIG.map((item) => {
          const onButtonClick =
            item.btnOption?.action === "verifyPassword" ? handleVerifyPassword : undefined;

          return (
            <div key={item.inputOption.name} className="h-[92px]">
              <InputText {...item} btnOption={{ ...item.btnOption, onClick: onButtonClick }} />
              {verifyMessage}
            </div>
          );
        })}
      </fieldset>

      <FooterButton type="submit">변경 완료</FooterButton>
    </form>
  );
};

export default ChangePasswordForm;
