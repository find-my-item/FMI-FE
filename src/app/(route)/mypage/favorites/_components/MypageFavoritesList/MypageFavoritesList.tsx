import { MypagePostListType } from "@/api/fetch/post";
import { useGetUserMeFavorites } from "@/api/fetch/user/api/useGetUserMeFavorites";
import { MypageEmptyUI, PostListItem } from "@/components/domain";

interface MypageFavoritesListProps {
  data: MypagePostListType[];
}

const MypageFavoritesList = ({ data }: MypageFavoritesListProps) => {
  // const { data: FavoritesData } = useGetUserMeFavorites({});

  return (
    <section>
      <h2 className="sr-only">내 즐겨찾기 목록 영역</h2>

      {data.length === 0 ? (
        <MypageEmptyUI pageType="favorites" />
      ) : (
        <ul>
          {data.map((item) => (
            <PostListItem key={item.postId} post={item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MypageFavoritesList;
