"use client";

import { useGetUserInquiryById } from "@/api/fetch/inquiry";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { useEffect } from "react";
import { INQUIRY_STATUS_CHIP } from "../../../_constants/INQUIRY_STATUS_CHIP";
import { Chip } from "@/components/common";
import { formatDate } from "@/utils";
import Image from "next/image";
import InquiryCommentItem from "../InquiryCommentItem/InquiryCommentItem";
import { MOCK_MYPAGE_INQUIRY_DETAIL } from "@/mock/data";

interface MypageInquiriesIdContainerProps {
  id: number;
}

const MypageInquiriesIdContainer = ({ id }: MypageInquiriesIdContainerProps) => {
  // const { data: reportIdData, isError, isLoading } = useGetUserInquiryById({ inquiryId: id });
  const { addToast } = useToast();

  // useEffect(() => {
  //   if (isError) addToast("문의 내역을 불러오는데 실패했어요", "error");
  // }, [isError, addToast]);

  // if (isLoading) return <LoadingState />;

  // const result = reportIdData?.result;
  // if (!result) return null;

  // const { title, content, status, createdAt, imageUrls, comments } = result;

  const { title, content, status, createdAt, imageUrls, comments } =
    MOCK_MYPAGE_INQUIRY_DETAIL.result;
  return (
    <div className="w-full h-base">
      <div className="border-b-flat-gray-50 flex w-full flex-col gap-[14px] border-b px-5 py-[30px]">
        <div>
          <Chip
            label={INQUIRY_STATUS_CHIP[status].label}
            type={INQUIRY_STATUS_CHIP[status].chipType}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-h2-medium">{title}</h2>
              <time
                dateTime={createdAt}
                className="mt-1 text-body2-regular text-layout-body-default"
              >
                {formatDate(createdAt)}
              </time>
            </div>

            <p className="inline-block text-body1-regular text-layout-header-default">{content}</p>
          </div>

          <div className="gap-[14px] flex-col-center">
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
                  style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                />
              ))}
          </div>
        </div>
      </div>

      {comments && (
        <ul>
          {comments.map((item) => (
            <li key={item.id}>
              <InquiryCommentItem data={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MypageInquiriesIdContainer;
