"use client";

import { use } from "react";
import { DetailHeader } from "@/components/layout";
import { useGetNoticeDetail } from "@/api/fetch/notice";
import { NoticeEditFormProvider } from "./_components/NoticeEditFormProvider/NoticeEditFormProvider";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const noticeId = Number(id);
  const { data: noticeDetail, isLoading } = useGetNoticeDetail({ id: noticeId });

  return (
    <>
      <DetailHeader title="공지사항 수정" />
      <h1 className="sr-only">공지사항 수정 페이지</h1>
      {!isLoading && noticeDetail?.result && (
        <NoticeEditFormProvider initialData={noticeDetail.result} noticeId={noticeId} />
      )}
    </>
  );
};

export default Page;
