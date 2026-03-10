"use client";

import { DetailHeader } from "@/components/layout";
import { FormProvider, useForm } from "react-hook-form";
import { Suspense } from "react";
import { MypageProfileFormType } from "./_types/MypageProfileFormType";
import { useGetUsersMe } from "@/api/fetch/user";
import { useToast } from "@/context/ToastContext";
import { ProfileForm } from "@/components/domain";

const page = () => {
  const { addToast } = useToast();

  const { data, error } = useGetUsersMe();
  if (error) {
    addToast("프로필 정보를 불러오지 못했어요.", "error");
  }

  const methods = useForm<MypageProfileFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      nickname: "",
      profileImage: data?.result?.profileImg ?? "",
    },
  });

  return (
    <Suspense fallback="">
      <DetailHeader title="프로필 설정" />
      <FormProvider {...methods}>
        <ProfileForm user={data?.result} />
      </FormProvider>
    </Suspense>
  );
};

export default page;
