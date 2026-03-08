import { ViewMoreComment } from "@/components/common";
import {
  DeleteCommentVariables,
  GetPostsCommentsData,
  useGetRepliesPostsComments,
} from "@/api/fetch/comment";
import CommentItem from "./CommentItem";
import { EmptyCommentUI, GuestCommentUI } from "./_internal";

interface CommentListProps {
  postId: number;
  comments?: GetPostsCommentsData;
  onSubmit: (content: string, image: File | null, parentId: number) => void;
  isPending: boolean;
  isLoggedIn?: boolean;
  useFetchReplies?: typeof useGetRepliesPostsComments;
  onDeleteComment: (commentVariables: DeleteCommentVariables) => void;
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
              onDeleteComment={onDeleteComment}
            />
          ))}
        </ul>
      )}

      {hasNext && <ViewMoreComment count={comments.remainingCount} />}
    </>
  );
};

export default CommentList;
