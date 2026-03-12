import { ViewMoreComment } from "@/components/common";
import {
  DeleteCommentVariables,
  GetPostsCommentsData,
  useGetRepliesPostsComments,
} from "@/api/fetch/comment";
import CommentItem from "./CommentItem";
import { EmptyCommentUI, GuestCommentUI } from "./_internal";

/**
 * 댓글 목록을 렌더링하는 컴포넌트입니다.
 *
 * !!현재 타입 에러를 방지하기 위해 타입 단언이 설정되어 있습니다. 공지사항 작업 후 제거 필요합니다.!!
 *
 * @author jikwon
 */

interface CommentListProps {
  /** 게시글 ID */
  postId: number;
  /** 댓글 목록 데이터 */
  comments?: GetPostsCommentsData;
  /** 답글 작성 함수 */
  onSubmit: (content: string, image: File | null, parentId: number) => void;
  /** 답글 작성 중 로딩 상태 */
  isPending: boolean;
  /** 로그인 여부 */
  isLoggedIn?: boolean;
  /** 답글 조회 함수 */
  useFetchReplies?: typeof useGetRepliesPostsComments;
  /** 답글 삭제 함수 */
  onDeleteComment?: (commentVariables: DeleteCommentVariables) => void;
  /** 답글 좋아요 함수 */
  onFavoriteComment?: (commentId: number, isLike: boolean, queryKey: unknown[]) => void;
}

// TODO(지권): 댓글 페이지네이션 백엔드 협의 필요
// TODO(지권): 댓글 전체 수 백엔드 누락
const CommentList = ({
  postId,
  comments,
  onSubmit,
  isPending,
  isLoggedIn,
  useFetchReplies,
  onDeleteComment,
  onFavoriteComment,
}: CommentListProps) => {
  if (!isLoggedIn) return <GuestCommentUI />;
  if (!comments) return null;

  const hasNext = comments.hasNext;
  const data = comments.comments;
  const isEmpty = data.length === 0;

  return (
    <>
      <header className="w-full border-t border-divider-default px-5">
        <h2 className="mt-[18px] flex items-center gap-1 py-2 text-body1-semibold text-layout-header-default">
          댓글<span>{data.length}</span>
        </h2>
      </header>

      {isEmpty && isLoggedIn ? (
        <EmptyCommentUI />
      ) : (
        <ul>
          {data.map((comment) => (
            <CommentItem
              key={comment.id}
              postId={postId}
              data={comment}
              onSubmit={onSubmit}
              isPending={isPending}
              useFetchReplies={useFetchReplies!}
              onDeleteComment={onDeleteComment!}
              onFavoriteComment={onFavoriteComment!}
            />
          ))}
        </ul>
      )}

      {hasNext && <ViewMoreComment count={comments.remainingCount} />}
    </>
  );
};

export default CommentList;
