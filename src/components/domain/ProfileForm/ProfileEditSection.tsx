"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetUsersMe } from "@/api/fetch/user";
import { useToast } from "@/context/ToastContext";
import { ProfileFormType } from "./_types/ProfileFormType";
import { ProfileForm } from "./_internal";

interface ProfileEditSectionProps {
  /**
   * 전송 전 확인 절차가 필요한 경우 사용하는 콜백입니다.
   * 유저에게 확인을 받은 후 전달받은 submitFn을 실행하면 API가 호출됩니다.
   */
  onConfirmRequest?: (submitFn: () => void) => void;
}

const ProfileEditSection = ({ onConfirmRequest }: ProfileEditSectionProps) => {
  const { addToast } = useToast();
  const { data, isError } = useGetUsersMe();

  useEffect(() => {
    if (isError) {
      addToast("프로필 정보를 불러오지 못했어요", "error");
    }
  }, [isError, addToast]);

  const methods = useForm<ProfileFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      nickname: "",
      profileImage: data?.result?.profileImg ?? "",
    },
  });

  return (
    <FormProvider {...methods}>
      <ProfileForm user={data?.result} onConfirmRequest={onConfirmRequest} />
    </FormProvider>
  );
};

export default ProfileEditSection;
