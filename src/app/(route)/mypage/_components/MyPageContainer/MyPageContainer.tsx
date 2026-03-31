"use client";

import { useToast } from "@/context/ToastContext";
import { useEffect } from "react";
import MyPageProfile from "../MyPageProfile/MyPageProfile";
import MyPageIconNav from "../MyPageIconNav/MyPageIconNav";
import MyPageMenuSection from "../MyPageMenuSection/MyPageMenuSection";
import { useGetUsersMe } from "@/api/fetch/user";
import { BetaTestMypageBanner } from "@/components/domain";

const MyPageContainer = ({ hasToken }: { hasToken: boolean }) => {
  const { data, isFetching, error } = useGetUsersMe(hasToken);
  const { addToast } = useToast();

  useEffect(() => {
    if (error) {
      const errorCode = error.response?.data.code;
      if (errorCode === "COMMON401") {
        // noop
      } else {
        addToast("프로필 정보를 불러오는데 실패했어요.", "warning");
      }
    }
  }, [error, addToast]);

  const userData = data?.result
    ? {
        email: data.result.email,
        profileImg: data.result.profileImg || "",
        nickname: data.result.nickname,
      }
    : undefined;

  return (
    <div className="flex w-full flex-col h-f-base">
      <MyPageProfile userData={userData} loading={isFetching} />

      <MyPageIconNav disabled={isFetching} />

      <BetaTestMypageBanner />

      <MyPageMenuSection isUserLogin={!!userData} disabled={isFetching} />
    </div>
  );
};

export default MyPageContainer;
