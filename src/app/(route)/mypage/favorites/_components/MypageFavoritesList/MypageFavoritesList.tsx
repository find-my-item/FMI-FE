import { MypagePostListType } from "@/api/fetch/post";
import { MypageEmptyUI, PostListItem } from "@/components/domain";

interface MypageFavoritesListProps {
  data: MypagePostListType[];
}

const MypageFavoritesList = ({ data }: MypageFavoritesListProps) => {
  return (
    <section>
      <h2 className="sr-only">내 즐겨찾기 목록 영역</h2>
      {data.length === 0 ? (
        <MypageEmptyUI pageType="favorites" />
      ) : (
        <ul>
          {data.map((item) => (
            <PostListItem key={item.postId} post={data} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MypageFavoritesList;
