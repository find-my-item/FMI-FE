"use client";

import { useGetUserMe } from "@/api/fetch/user/api/useGetUsersMe";
import { MyPageIconNav, MyPageMenuSection, MyPageProfile } from "./_components";
import { LoadingState } from "@/components/state";

const page = () => {
  const { data, isLoading, error } = useGetUserMe();
  console.log("data>> ", data);

  if (isLoading) return <LoadingState />;

  return (
    <div className="flex w-full flex-col">
      {data && <MyPageProfile email={data.result.email} userName={data.result.nickname} />}

      <MyPageIconNav />

      <MyPageMenuSection />
    </div>
  );
};

export default page;
