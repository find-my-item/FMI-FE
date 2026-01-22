import { MypageEmptyUI, PostListItem } from "@/components/domain";
import { MOCK_MYPAGE_POSTS_LIST } from "@/mock/MOCK_DATA";
import { CategoryType, ItemStatus, PostType } from "@/types";

const MypagePostsList = () => {
  return (
    <section>
      <h2 className="sr-only">게시글 목록 영역</h2>
      <ul>
        {MOCK_MYPAGE_POSTS_LIST.map((item) => (
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
      {MOCK_MYPAGE_POSTS_LIST.length === 0 && (
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
