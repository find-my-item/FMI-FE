import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useAuthStore } from "@/store";
import { MypageReportsResponseType, ReportItemType } from "../types/MypageReportsResponseType";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import { RequestType } from "@/types";

interface useGetUserReportsParams {
  status?: RequestType;
  answer?: boolean;
  keyword?: string;
  size?: number;
}

export const useGetUserReports = ({ keyword, size = 10 }: useGetUserReportsParams) => {
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const queryParams = new URLSearchParams();
  if (keyword) queryParams.set("keyword", keyword);
  queryParams.set("size", size.toString());

  return useAppInfiniteQuery<
    MypageReportsResponseType,
    ApiBaseResponseType<null>,
    ReportItemType[]
  >("auth", ["/users/me/activities", keyword], `/users/me/activities?${queryParams}`, {
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
    select: (data: InfiniteData<MypageReportsResponseType>) =>
      data.pages.flatMap((page) => page.result.content),
    enabled: isAuthInitialized,
  });
};
