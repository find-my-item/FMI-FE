"use client";

import { useGetUserMeFavorites } from "@/api/fetch/user";
import { StatusFilterValue } from "@/components/domain/FilterSectionBottomSheet/_types/types";
import { useFilterParams } from "@/hooks/domain";
import MypageFavoritesList from "../MypageFavoritesList/MypageFavoritesList";

const MypageFavoritesContent = () => {
  const { region, status, category, sort } = useFilterParams();

  const {
    data: FavoritesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUserMeFavorites({
    address: region ?? undefined,
    postType: status as StatusFilterValue,
    category: category,
    sortType: sort ?? "LATEST",
  });

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
