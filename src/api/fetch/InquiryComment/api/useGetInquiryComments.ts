import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { InquiryCommentsItem, GetInquiryCommentsResponse } from "../types/GetInquiryCommentsType";

interface UseGetInquiryCommentsParams {
  inquiryId: number;
  size?: number;
}

export const useGetInquiryComments = ({ inquiryId, size = 10 }: UseGetInquiryCommentsParams) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  return useAppInfiniteQuery<GetInquiryCommentsResponse, unknown, InquiryCommentsItem[]>(
    "auth",
    ["inquiries", inquiryId],
    `/inquiries/${inquiryId}/comments?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
      select: (data: InfiniteData<GetInquiryCommentsResponse>) =>
        data.pages.flatMap((page) => page.result.comments ?? []),
    }
  );
};
