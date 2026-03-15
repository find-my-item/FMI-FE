"use client";

import { useGetUsersMePosts } from "@/api/fetch/user";
import { useFilterParams } from "@/hooks/domain";
import {
  FindStatusFilterValue,
  StatusFilterValue,
} from "@/components/domain/FilterSectionBottomSheet/_types/types";
import MypagePostsList from "../MypagePostsList/MypagePostsList";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";

const MypagePostsContent = () => {
  const { status, findStatus, category, sort, startDate, endDate } = useFilterParams();
  const { addToast } = useToast();

  const {
    data: PostsData,
    isLoading,
    isError,
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

  if (isLoading) return <LoadingState />;
  if (isError) addToast("목록을 불러오는데 실패했어요", "error");

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
