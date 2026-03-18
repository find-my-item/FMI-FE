"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderSetting } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { useRouter } from "next/navigation";

const AlertDetailHeader = () => {
  const router = useRouter();

  return (
    <DetailHeader title="알림">
      <HeaderSetting onClick={() => router.push("/mypage/notifications")} />
    </DetailHeader>
  );
};

export default AlertDetailHeader;
