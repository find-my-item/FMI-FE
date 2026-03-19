import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useAuthStore } from "@/store";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import { RequestType } from "@/types";
import {
  InquiriesItemType,
  MypageInquiriesResponseType,
} from "../types/MypageInquiriesResponseType";

interface useGetUserInquiriesParams {
  status?: RequestType;
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
    MypageInquiriesResponseType,
    ApiBaseResponseType<null>,
    InquiriesItemType[]
  >("auth", ["/users/me/inquiries", keyword], `/users/me/inquiries?${queryParams}`, {
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
    select: (data: InfiniteData<MypageInquiriesResponseType>) =>
      data.pages.flatMap((page) => page.result.content),
    enabled: isAuthInitialized,
  });
};
