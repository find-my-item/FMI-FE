"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderDelete, HeaderSetting } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { useRouter } from "next/navigation";

const AlertDetailHeader = ({
  isDeleteMode,
  setIsDeleteMode,
}: {
  isDeleteMode: boolean;
  setIsDeleteMode: (isDeleteMode: boolean) => void;
}) => {
  const router = useRouter();

  return (
    <>
      <DetailHeader title="알림">
        <HeaderDelete isDeleteMode={isDeleteMode} setIsDeleteMode={setIsDeleteMode} />
        <HeaderSetting onClick={() => router.push("/mypage/notifications")} />
      </DetailHeader>
      <h1 className="sr-only">알림 페이지</h1>
    </>
  );
};

export default AlertDetailHeader;
