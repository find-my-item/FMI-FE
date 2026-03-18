"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetUsersMe } from "@/api/fetch/user";
import { useToast } from "@/context/ToastContext";
import { ProfileFormType } from "./_types/ProfileFormType";
import { ProfileForm } from "./_internal";

interface ProfileEditSectionProps {
  onConfirmRequest?: (submitFn: () => void) => void;
}

const ProfileEditSection = ({ onConfirmRequest }: ProfileEditSectionProps) => {
  const { addToast } = useToast();
  const { data, isError } = useGetUsersMe();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isError) {
      addToast("프로필 정보를 불러오지 못했어요", "error");
    }
  }, [isError, addToast]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const methods = useForm<ProfileFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      nickname: "",
      profileImage: data?.result?.profileImg ?? "",
    },
  });

  if (!isMounted) return null;

  return (
    <FormProvider {...methods}>
      <ProfileForm user={data?.result} onConfirmRequest={onConfirmRequest} />
    </FormProvider>
  );
};

export default ProfileEditSection;
