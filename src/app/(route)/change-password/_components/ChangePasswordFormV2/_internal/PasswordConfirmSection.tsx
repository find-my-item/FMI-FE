import { InputText, RequiredText } from "@/components/common";
import { cn } from "@/utils";

const PasswordConfirmSection = () => {
  return (
    <>
      <section className="flex min-h-[96px] flex-col gap-2">
        <label htmlFor="newPassword" className="text-body2-medium text-layout-header-default">
          새 비밀번호
          <RequiredText />
        </label>
        <InputText
          inputOption={{
            name: "newPassword",
            type: "password",
            placeholder: "새 비밀번호를 입력해주세요.",
          }}
        />
        <span className={cn("text-caption1-regular text-layout-body-default")}>
          대문자/소문자/숫자/특수 문자 포함 8자리 이상
        </span>
      </section>

      <section className="flex min-h-[96px] flex-col gap-2">
        <label
          htmlFor="newPasswordConfirm"
          className="text-body2-medium text-layout-header-default"
        >
          새 비밀번호 확인
          <RequiredText />
        </label>
        <InputText
          inputOption={{
            name: "newPasswordConfirm",
            type: "password",
            placeholder: "비밀번호를 한 번 더 입력해 주세요.",
          }}
        />
        <span className={cn("text-caption1-regular text-layout-body-default")}>
          비밀번호가 일치하지 않습니다.
        </span>
      </section>
    </>
  );
};

export default PasswordConfirmSection;
