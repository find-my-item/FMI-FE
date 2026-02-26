"use client";

import { DetailHeader } from "@/components/layout";
import { FormProvider, useForm } from "react-hook-form";
import { Suspense } from "react";
import { MypageProfileForm } from "./_components";
import { MypageProfileFormType } from "./_types/MypageProfileFormType";
import { useGetUsersMe } from "@/api/fetch/user";
import { useToast } from "@/context/ToastContext";

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
      profileImg: data?.result?.profileImg ?? "",
    },
  });

  return (
    <Suspense fallback="">
      <DetailHeader title="프로필 설정" />
      <FormProvider {...methods}>
        <MypageProfileForm user={data?.result} />
      </FormProvider>
    </Suspense>
  );
};

export default page;
