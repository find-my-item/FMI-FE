import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { useAuthStore } from "@/store";

interface useGetUserReportsParams {
  keyword?: string;
  size?: number;
}

export const useGetUserReports = ({ keyword, size = 10 }: useGetUserReportsParams) => {
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const queryParams = new URLSearchParams();
  if (keyword) queryParams.set("keyword", keyword);
  queryParams.set("size", size.toString());

  return useAppInfiniteQuery<
    MypageActivityResponse,
    ApiBaseResponseType<null>,
    ActivityGroupItemType[]
  >(
    "auth",
    ["/users/me/activities", type, startDate, endDate, keyword],
    `/users/me/activities?${queryParams}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
      select: (data: InfiniteData<MypageActivityResponse>) =>
        data.pages.flatMap((page) => page.result.activities),
      enabled: isAuthInitialized,
    }
  );
};
