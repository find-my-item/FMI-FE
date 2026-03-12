import { FooterButton } from "@/components/domain";
import PasswordConfirmSection from "./_internal/PasswordConfirmSection";
import VerifyPasswordSection from "./_internal/VerifyPasswordSection";

const ChangePasswordFormV2 = () => {
  return (
    <form className="flex h-dvh flex-col justify-between" onSubmit={() => {}}>
      <div className="flex flex-col gap-5 px-5 py-[30px]">
        <VerifyPasswordSection />

        <PasswordConfirmSection />
      </div>

      <FooterButton type="submit">변경 완료</FooterButton>
    </form>
  );
};

export default ChangePasswordFormV2;
