"use client";

import { DetailHeader } from "@/components/layout";
import { NoticeView } from "./_components";
import { FloatingButton } from "@/components/common";
import { useRouter } from "next/navigation";

const Notice = () => {
  const router = useRouter();

  return (
    <>
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">공지사항 목록</h1>
      <NoticeView />

      <div className="fixed-button-position">
        <FloatingButton
          ariaLabel="공지사항 작성 페이지 이동"
          mode="notice"
          onClick={() => router.push("/admin/notice/write")}
        />
      </div>
    </>
  );
};

export default Notice;
