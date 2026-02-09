import { MypagePostListType } from "@/api/fetch/post";
import { MypageEmptyUI, PostListItem } from "@/components/domain";

interface MypagePostsListProps {
  data: MypagePostListType[];
}

const MypagePostsList = ({ data }: MypagePostsListProps) => {
  return (
    <section>
      <h2 className="sr-only">게시글 목록 영역</h2>
      {data.length === 0 ? (
        <MypageEmptyUI pageType="posts" />
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

export default MypagePostsList;
