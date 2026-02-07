"use client";

import { useParams, notFound } from "next/navigation";
import { DetailHeader } from "@/components/layout";
import { AdminReportsView } from "./_components";
import { CommentForm } from "@/app/(route)/list/[id]/_components";

const page = () => {
  const params = useParams();

  const reportsType = params.reportsType;
  const id = params.id;

  if (reportsType !== "report" && reportsType !== "inquiry") return notFound();

  return (
    <>
      <DetailHeader title="신고/문의 내역" />
      <h1 className="sr-only">신고/문의 상세</h1>

      <AdminReportsView id={Number(id)} />
      {/* TODO(지권): 임시 댓글 입력 폼 추가 */}
      <CommentForm />
    </>
  );
};

export default page;
