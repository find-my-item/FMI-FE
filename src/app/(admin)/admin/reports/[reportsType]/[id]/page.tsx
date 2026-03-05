"use client";

import { useParams, notFound } from "next/navigation";
import { DetailReportsType } from "@/api/fetch/admin";
import { DetailHeader } from "@/components/layout";
import { normalizeEnumValue } from "@/utils";
import { AdminReportsView } from "./_components";
import { PostInputComment } from "@/app/(route)/list/[id]/_components";
import { VALID_TYPES } from "./_types/VALID_TYPES";

const page = () => {
  const { reportsType, id } = useParams();

  if (!VALID_TYPES.includes(reportsType as (typeof VALID_TYPES)[number])) {
    return notFound();
  }

  return (
    <>
      <DetailHeader title="신고/문의 내역" />
      <h1 className="sr-only">신고/문의 상세</h1>

      <AdminReportsView
        id={Number(id)}
        type={normalizeEnumValue(reportsType as DetailReportsType) || "REPORT"}
      />
      {/* TODO(지권): 임시 댓글 입력 폼 추가, 빌드 에러 임시 해결 */}
      <PostInputComment postId={123} />
    </>
  );
};

export default page;
