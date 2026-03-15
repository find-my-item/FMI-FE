import { CommentCard, MypageEmptyUI } from "@/components/domain";
import { CommentItem } from "@/api/fetch/user/types/UserMeCommentsType";
import { useInfiniteScroll } from "@/hooks";

interface MypageCommentsListProps {
  commentData: CommentItem[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

const MypageCommentsList = ({
  commentData,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: MypageCommentsListProps) => {
  const { ref } = useInfiniteScroll({ hasNextPage, fetchNextPage, isFetchingNextPage });
  return (
    <section>
      <h2 className="sr-only">댓글 목록 영역</h2>

      {commentData.length === 0 ? (
        <MypageEmptyUI pageType="comments" />
      ) : (
        <>
          <ul>
            {commentData.map((item) => (
              <CommentCard key={item.commentId} data={item} />
            ))}
          </ul>
          <div ref={ref} className="h-10" />
        </>
      )}
    </section>
  );
};

export default MypageCommentsList;
