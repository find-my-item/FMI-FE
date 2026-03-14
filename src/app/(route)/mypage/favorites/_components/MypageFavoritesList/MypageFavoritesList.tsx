import { PostItem } from "@/api/fetch/post";
import { MypageEmptyUI, PostListItem } from "@/components/domain";
import { useInfiniteScroll } from "@/hooks";

interface MypageFavoritesListProps {
  favoritesData: PostItem[];
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const MypageFavoritesList = ({
  favoritesData,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: MypageFavoritesListProps) => {
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <section>
      <h2 className="sr-only">내 즐겨찾기 목록 영역</h2>

      {favoritesData.length === 0 ? (
        <MypageEmptyUI pageType="favorites" />
      ) : (
        <>
          <ul>
            {favoritesData.map((item, index) => (
              <PostListItem key={index} post={item} />
            ))}
          </ul>

          <div ref={ref} className="h-10" />
        </>
      )}
    </section>
  );
};

export default MypageFavoritesList;
