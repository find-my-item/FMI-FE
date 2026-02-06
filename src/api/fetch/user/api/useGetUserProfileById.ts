import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import {
  GetUserProfileDataResponse,
  UserProfileInfiniteSelectedData,
  UserProfileItem,
} from "../types/UserProfileIdDataType";
import { UserTabType } from "../types/UserDataType";

export const useGetUserProfileById = (userId: string | undefined, tab: UserTabType, size = 10) => {
  const params = new URLSearchParams();
  params.set("tab", tab);
  params.set("size", String(size));

  return useAppInfiniteQuery<GetUserProfileDataResponse, unknown, UserProfileInfiniteSelectedData>(
    "auth",
    ["user-data", userId, tab, size],
    `/users/${userId}/page?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      enabled: !!userId,

      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,

      select: (data: InfiniteData<GetUserProfileDataResponse>) => {
        const first = data.pages[0]?.result;

        const list = data.pages.flatMap((page): UserProfileItem[] => {
          const r = page.result;

          if (tab === "posts") return r.posts;
          if (tab === "favorites") return r.favorites;
          return r.comments;
        });

        return {
          profile: {
            userId: first?.userId ?? undefined,
            nickname: first?.nickname ?? "",
            profileImg: first?.profileImg ?? "",
          },
          list,
        };
      },
    }
  );
};
