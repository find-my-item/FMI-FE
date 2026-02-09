import { MypagePostListType } from "@/api/fetch/post";
import { MypageEmptyUI, PostListItem } from "@/components/domain";
import { CategoryType, ItemStatus, PostType } from "@/types";

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
            <PostListItem
              key={item.postId}
              post={{
                postId: item.postId,
                title: item.title,
                summary: item.summary,
                thumbnailUrl: item.thumbnailUrl,
                address: item.address,
                itemStatus: item.itemStatus as ItemStatus,
                postType: item.postType as PostType,
                category: item.category as CategoryType,
                favoriteCount: item.favoriteCount,
                viewCount: item.viewCount,
                createdAt: item.createdAt,
                hot: item.hot,
                new: item.new,
              }}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MypageFavoritesList;
