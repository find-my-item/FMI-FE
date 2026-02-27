import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { GetNoticesResponse, NoticeItem } from "../types/NoticesType";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";

interface UseGetDeletedUsersParams {
  category?: string;
  keyword?: string;
  sortType?: string;
  page?: string;
  size?: number;
}

export const useGetNotices = ({
  category,
  keyword,
  sortType,
  page,
  size = 10,
}: UseGetDeletedUsersParams = {}) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  if (category) params.set("category", category);
  if (keyword) params.set("keyword", keyword);
  if (sortType) params.set("sortType", sortType);
  if (page) params.set("page", page);

  return useAppInfiniteQuery<GetNoticesResponse, unknown, NoticeItem[]>(
    "auth",
    ["notices", category, keyword, sortType, page, size],
    `/notices?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.last ? undefined : lastPage.result.number + 1,
      select: (data: InfiniteData<GetNoticesResponse>) =>
        data.pages.flatMap((page) => page.result.content),
      throwOnError: true,
      suspense: true,
    }
  );
};
