"use client";

import { useGetUserInquiries } from "@/api/fetch/user";
import { Chip } from "@/components/common";
import { MypageEmptyUI } from "@/components/domain";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { useInfiniteScroll } from "@/hooks";
import { useFilterParams } from "@/hooks/domain";
import { formatDate } from "@/utils";
import Link from "next/link";
import { useEffect } from "react";

export const INQUIRY_STATUS_CHIP = {
  RECEIVED: { label: "접수", chipType: "brandSubtle" },
  PENDING: { label: "접수 중", chipType: "brandSubtle" },
  ANSWERED: { label: "답변 완료", chipType: "neutralStrong" },
} as const;

interface MypageInquiryItemProps {
  inquiries: InquiriesCommentType;
}

const MypageInquiryItem = ({ inquiries }: MypageInquiryItemProps) => {
  const { id } = inquiries;

  return (
    <li className="flex w-full flex-col justify-between border-b border-divider-default px-5 py-[30px]">
      <Link href={`/mypage/reports/${id}`}>
        <Chip label={INQUIRY_STATUS_CHIP.label} type={INQUIRY_STATUS_CHIP.chipType} />

        <h3 className="mt-2 text-h3-semibold text-layout-header-default">{targetTitle}</h3>

        <time
          dateTime={createdAt}
          className="mt-[3px] block text-body2-regular text-layout-body-default"
        >
          {formatDate(createdAt)}
        </time>

        <p className="mt-2 truncate text-body2-regular text-neutral-normal-default">{reason}</p>
      </Link>
    </li>
  );
};

const MypageInquiriesContent = () => {
  const { inquiryStatus } = useFilterParams();

  const {
    data: inquiriesData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUserInquiries({
    status: inquiryStatus,
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (isError) {
      addToast("목록을 불러오는데 실패했어요", "error");
    }
  }, [isError, addToast]);

  const { ref } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  if (isLoading) return <LoadingState />;

  return (
    <section>
      <h2 className="sr-only">내 신고 내역 목록 영역</h2>

      {inquiriesData && inquiriesData.length === 0 ? (
        <MypageEmptyUI pageType="reports" />
      ) : (
        <>
          <ul>
            {inquiriesData &&
              inquiriesData.map((item) => (
                <MypageInquiryItem key={item.reportId} inquiries={item} />
              ))}
          </ul>

          {hasNextPage && <div ref={ref} className="h-10" />}
        </>
      )}
    </section>
  );
};

export default MypageInquiriesContent;
