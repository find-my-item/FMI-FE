import { MypageEmptyUI, PostListItem } from "@/components/domain";
import { CategoryType, ItemStatus, PostType } from "@/types";

interface MypagePostsListProps {
  data: {
    postId: number;
    title: string;
    summary: string;
    thumbnailUrl: string;
    address: string;
    itemStatus: ItemStatus;
    postType: PostType;
    category: CategoryType;
    favoriteCount: number;
    viewCount: number;
    createdAt: string;
    hot: boolean;
    new: boolean;
  }[];
}

const MypagePostsList = ({ data }: MypagePostsListProps) => {
  return (
    <section>
      <h2 className="sr-only">게시글 목록 영역</h2>
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
      {data.length === 0 && (
        <MypageEmptyUI
          IconName="NoPosts"
          titleText="작성한 게시글"
          subText="지금 바로 글을 남겨보세요!"
        />
      )}
    </section>
  );
};

export default MypagePostsList;
