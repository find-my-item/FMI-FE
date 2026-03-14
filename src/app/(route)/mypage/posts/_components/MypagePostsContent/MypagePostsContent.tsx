"use client";

import { useGetUsersMePosts } from "@/api/fetch/user";
import { useFilterParams } from "@/hooks/domain";
import {
  FindStatusFilterValue,
  StatusFilterValue,
} from "@/components/domain/FilterSectionBottomSheet/_types/types";
import MypagePostsList from "../MypagePostsList/MypagePostsList";

const MypagePostsContent = () => {
  const { status, findStatus, category, sort, startDate, endDate } = useFilterParams();

  const {
    data: PostsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUsersMePosts({
    postType: status as StatusFilterValue,
    postStatus: findStatus as FindStatusFilterValue,
    category,
    startDate,
    endDate,
    sortType: sort ?? "LATEST",
  });

  return (
    <>
      {PostsData && (
        <MypagePostsList
          postsData={PostsData}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </>
  );
};

export default MypagePostsContent;
