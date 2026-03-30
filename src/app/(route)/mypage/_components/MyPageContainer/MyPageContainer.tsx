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
    const errorCode = error?.response?.data.code;
    console.log("errorCode>>>>>       ", errorCode);
    if (errorCode === "AUTH401-INVALID_REFRESH") {
      // noop
    } else if (errorCode === "USER404-NOT_FOUND") {
      // noop 존재하지 않는 회원
    } else {
      addToast("예상치 못한 에러가 발생했어요", "error");
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
