"use client";

import { FilterSection, MypageSearch } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { useFilterParams } from "@/hooks/domain";
import { useGetUserMeFavorites } from "@/api/fetch/user";
import { StatusFilterValue } from "@/components/domain/FilterSectionBottomSheet/_types/types";
import { LoadingState } from "@/components/state";
import MypageFavoritesList from "../MypageFavoritesList/MypageFavoritesList";

const MypageFavoritesContent = () => {
  const { region, status, category, sort } = useFilterParams();

  const {
    data: FavoritesData,
    isLoading,
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

  return (
    <>
      <DetailHeader title="즐겨찾기 목록" />
      <h1 className="sr-only">즐겨찾기 목록 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <FilterSection pageType="MY_FAVORITES" />

        <MypageFavoritesList
          favoritesData={FavoritesData}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
};

export default MypageFavoritesContent;
