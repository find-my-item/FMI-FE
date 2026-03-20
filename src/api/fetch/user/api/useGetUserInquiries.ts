import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useAuthStore } from "@/store";
import { InquiryType } from "@/types";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import { GetInquiriesResponseType, InquiryItemType } from "../types/GetInquiriesResponseType";

interface useGetUserInquiriesParams {
  status?: InquiryType;
  keyword?: string;
  size?: number;
}

export const useGetUserInquiries = ({ status, keyword, size = 10 }: useGetUserInquiriesParams) => {
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const queryParams = new URLSearchParams();
  if (keyword) queryParams.set("keyword", keyword);
  if (status) queryParams.set("status", status);
  queryParams.set("size", size.toString());

  return useAppInfiniteQuery<
    GetInquiriesResponseType,
    ApiBaseResponseType<null>,
    InquiryItemType[]
  >("auth", ["/inquiries/me", keyword], `/inquiries/me?${queryParams}`, {
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
    select: (data: InfiniteData<GetInquiriesResponseType>) =>
      data.pages.flatMap((page) => page.result.content),
    enabled: isAuthInitialized,
  });
};
