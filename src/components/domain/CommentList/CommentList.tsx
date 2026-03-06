import { ViewMoreComment } from "@/components/common";
import CommentItem from "./CommentItem";
import { GetPostsCommentsData } from "@/api/fetch/comment";

interface CommentListProps {
  postId: number;
  comments?: GetPostsCommentsData;
  onSubmit: (content: string, image: File | null, parentId: number) => void;
  isPending: boolean;
}

// TODO(지권): 댓글 페이지네이션 백엔드 협의 필요
// TODO(지권): 댓글 전체 수 백엔드 누락
const CommentList = ({ postId, comments, onSubmit, isPending }: CommentListProps) => {
  if (!comments || !comments.comments?.length) return null;

  const hasNext = comments.hasNext;
  const data = comments.comments;

  return (
    <>
      <header className="w-full border-t border-divider-default px-5">
        <h2 className="mt-[18px] flex items-center gap-1 py-2 text-body1-semibold text-layout-header-default">
          댓글<span>{data.length}</span>
        </h2>
      </header>
      <ul>
        {data.map((comment) => (
          <CommentItem
            key={comment.id}
            postId={postId}
            data={comment}
            onSubmit={onSubmit}
            isPending={isPending}
          />
        ))}
      </ul>

      {hasNext && <ViewMoreComment count={comments.remainingCount} />}
    </>
  );
};

export default CommentList;
