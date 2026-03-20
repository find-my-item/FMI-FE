"use client";

import { useGetUserInquiryById } from "@/api/fetch/inquiry";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { useEffect } from "react";
import { INQUIRY_STATUS_CHIP } from "../../../_constants/INQUIRY_STATUS_CHIP";
import { Chip } from "@/components/common";
import { REPORT_STATUS_CHIP } from "@/components/domain/MypageRequest/_constants/STATUS_CHIP";
import { formatDate } from "@/utils";
import { MypageCommentItem } from "@/components/domain";
import Image from "next/image";

interface MypageReportsIdContainerProps {
  id: number;
}

const MypageInquiriesIdContainer = ({ id }: MypageReportsIdContainerProps) => {
  const { data: reportIdData, isError, isLoading } = useGetUserInquiryById({ inquiryId: id });
  const { addToast } = useToast();

  useEffect(() => {
    if (isError) addToast("신고내역을 불러오는데 실패했어요", "error");
  }, [isError, addToast]);

  if (isLoading) return <LoadingState />;

  const result = reportIdData?.result;
  if (!result) return null;

  const { nickname, email, inquiryId, title, content, status, createdAt, imageUrls, comments } =
    result;

  return (
    <div className="w-full h-base">
      <div className="border-b-flat-gray-50 w-full border-b px-5 py-[30px]">
        <Chip
          label={INQUIRY_STATUS_CHIP[status].label}
          type={INQUIRY_STATUS_CHIP[status].chipType}
        />
        <h2 className="mt-[14px] text-h2-medium">{title}</h2>
        <time dateTime={createdAt} className="mt-1 text-body2-regular text-layout-body-default">
          {formatDate(createdAt)}
        </time>
        <p className="mt-6 text-body1-regular text-layout-header-default">{content}</p>

        {imageUrls &&
          imageUrls.length > 0 &&
          imageUrls.map((imageUrl, index) => (
            <Image
              key={index}
              alt={`이미지 ${index + 1}`}
              src={imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          ))}
      </div>

      {/* {comments && comments.map((item) => (
        <ul>
          <MypageCommentItem
            data={{
              resolvedAt: resolvedAt,
              content: adminAnswer,
              nickname: "찾아줘! 관리자",
              role: "admin",
            }}
          />
        </ul>
      ))} */}
    </div>
  );
};

export default MypageInquiriesIdContainer;
