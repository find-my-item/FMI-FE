import { PostItem } from "@/api/fetch/post";
import { MypageEmptyUI, PostListItem } from "@/components/domain";
import { LoadingState } from "@/components/state";
import { useInfiniteScroll } from "@/hooks";

interface MypagePostsListProps {
  postsData: PostItem[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

const MypagePostsList = ({
  postsData,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: MypagePostsListProps) => {
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <section>
      <h2 className="sr-only">게시글 목록 영역</h2>
      {postsData.length === 0 ? (
        <MypageEmptyUI pageType="posts" />
      ) : (
        <>
          <ul>
            {postsData.map((item, index) => (
              <PostListItem key={index} post={item} />
            ))}
          </ul>

          <div ref={ref} className="h-10" />
        </>
      )}
    </section>
  );
};

export default MypagePostsList;
