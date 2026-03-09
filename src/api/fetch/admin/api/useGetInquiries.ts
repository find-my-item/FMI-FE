import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { InquiryStatus, InquiryTargetType } from "@/types";
import { AdminInquiriesItem, GetInquiriesResponse } from "../types/InquiriesType";

interface UseGetInquiriesParams {
  type?: InquiryTargetType;
  status?: InquiryStatus;
  answered?: boolean;
  keyword?: string;
  size?: number;
}

interface UseGetInquiriesOptions {
  enabled?: boolean;
}

export const useGetInquiries = (
  { status, type, answered = false, keyword, size = 10 }: UseGetInquiriesParams,
  { enabled = true }: UseGetInquiriesOptions = {}
) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  if (status) params.set("status", status);
  if (type) params.set("type", type);
  params.set("answered", String(answered));
  if (keyword) params.set("keyword", keyword);

  return useAppInfiniteQuery<GetInquiriesResponse, unknown, AdminInquiriesItem[]>(
    "auth",
    ["inquiries", status, type, answered, keyword, size],
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
