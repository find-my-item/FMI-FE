import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { GetDeletedUsersResponse, WithdrawUserItem } from "../types/WithdrawalType";

interface UseGetDeletedUsersParams {
  reason?: string;
  size?: number;
}

export const useGetDeletedUsers = ({ reason, size = 10 }: UseGetDeletedUsersParams = {}) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  if (reason) params.set("reason", reason);

  return useAppInfiniteQuery<GetDeletedUsersResponse, unknown, WithdrawUserItem[]>(
    "auth",
    ["deletedUsers", reason, size],
    `/admin/users/deleted?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.last ? undefined : lastPage.result.number + 1,
      select: (data: InfiniteData<GetDeletedUsersResponse>) =>
        data.pages.flatMap((page) => page.result.content),
      throwOnError: true,
      suspense: true,
    }
  );
};
