import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { AdminGuestInquiryItem, GetGuestInquiriesResponse } from "../types/GuestInquiriesType";

interface UseGetGuestInquiriesParams {
  status?: string;
  keyword?: string;
  cursor?: string;
  size?: number;
}

export const useGetGuestInquiries = ({
  status,
  keyword,
  cursor,
  size = 10,
}: UseGetGuestInquiriesParams = {}) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  if (status) params.set("status", status);
  if (keyword) params.set("keyword", keyword);
  if (cursor) params.set("cursor", cursor);

  return useAppInfiniteQuery<GetGuestInquiriesResponse, unknown, AdminGuestInquiryItem[]>(
    "auth",
    ["guestInquiries", status, keyword, cursor, size],
    `/admin/guest-inquiries?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
      select: (data: InfiniteData<GetGuestInquiriesResponse>) =>
        data.pages.flatMap((page) => page.result.content ?? []),
    }
  );
};
