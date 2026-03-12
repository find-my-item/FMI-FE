import { PostItem } from "@/api/fetch/post";
import { MypageEmptyUI, PostListItem } from "@/components/domain";
import { LoadingState } from "@/components/state";

interface MypagePostsListProps {
  postsData?: PostItem[];
}

const MypagePostsList = ({ postsData }: MypagePostsListProps) => {
  if (postsData === undefined) return <LoadingState />;

  return (
    <section>
      <h2 className="sr-only">게시글 목록 영역</h2>
      {postsData.length === 0 ? (
        <MypageEmptyUI pageType="posts" />
      ) : (
        <ul>
          {postsData.map((item, index) => (
            <PostListItem key={index} post={item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MypagePostsList;
