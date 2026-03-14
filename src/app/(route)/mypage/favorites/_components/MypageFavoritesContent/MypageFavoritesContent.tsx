"use client";

import { useGetUserMeFavorites } from "@/api/fetch/user";
import { StatusFilterValue } from "@/components/domain/FilterSectionBottomSheet/_types/types";
import { useFilterParams } from "@/hooks/domain";
import MypageFavoritesList from "../MypageFavoritesList/MypageFavoritesList";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { Suspense } from "react";

const MypageFavoritesContent = () => {
  const { addToast } = useToast();
  const { region, status, category, sort } = useFilterParams();

  const {
    data: FavoritesData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUserMeFavorites({
    address: region ?? undefined,
    postType: status as StatusFilterValue,
    category: category,
    sortType: sort ?? "LATEST",
  });

  if (isLoading) return <LoadingState />;
  if (isError) addToast("목록을 불러오는데 실패했어요", "error");

  return (
    <>
      {FavoritesData && (
        <MypageFavoritesList
          favoritesData={FavoritesData}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </>
  );
};

export default MypageFavoritesContent;
