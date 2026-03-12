"use client";
"use no memo";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useGetUsersMe, usePostChangePassword } from "@/api/fetch/user";
import { FooterButton } from "@/components/domain";
import PasswordConfirmSection from "./_internal/PasswordConfirmSection";
import VerifyPasswordSection from "./_internal/VerifyPasswordSection";

const ChangePasswordFormV2 = () => {
  const router = useRouter();

  const { watch } = useFormContext();

  const { data: userData } = useGetUsersMe();
  const { mutateAsync, isPending } = usePostChangePassword();

  const [newPassword, newPasswordConfirm] = watch(["newPassword", "newPasswordConfirm"]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await mutateAsync({ newPassword, newPasswordConfirm });

    if (userData?.result?.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/mypage");
    }
  };

  const buttonDisabled =
    isPending || !newPassword || !newPasswordConfirm || newPassword !== newPasswordConfirm;

  return (
    <form className="flex h-dvh flex-col justify-between" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5 px-5 py-[30px]">
        <VerifyPasswordSection />

        <PasswordConfirmSection />
      </div>

      <FooterButton type="submit" disabled={buttonDisabled}>
        변경 완료
      </FooterButton>
    </form>
  );
};

export default ChangePasswordFormV2;
