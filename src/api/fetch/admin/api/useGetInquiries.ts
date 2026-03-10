import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { InquiryStatus } from "@/types";
import { AdminInquiriesItem, GetInquiriesResponse } from "../types/InquiriesType";

interface UseGetInquiriesParams {
  status?: InquiryStatus;
  answered?: boolean;
  keyword?: string;
  size?: number;
}

interface UseGetInquiriesOptions {
  enabled?: boolean;
}

export const useGetInquiries = (
  { status, answered = false, keyword, size = 10 }: UseGetInquiriesParams,
  { enabled = true }: UseGetInquiriesOptions = {}
) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  if (status) params.set("status", status);
  params.set("answered", String(answered));
  if (keyword) params.set("keyword", keyword);

  return useAppInfiniteQuery<GetInquiriesResponse, unknown, AdminInquiriesItem[]>(
    "auth",
    ["inquiries", status, answered, keyword, size],
    `/admin/inquiries?${params.toString()}`,
    {
      enabled,
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
      select: (data: InfiniteData<GetInquiriesResponse>) =>
        data.pages.flatMap((page) => page.result.content ?? []),
    }
  );
};
