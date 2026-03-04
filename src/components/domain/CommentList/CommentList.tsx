import { ViewMoreComment } from "@/components/common";
import CommentItem from "./CommentItem";
import { CommentItemType } from "@/types";

interface CommentListProps {
  comments: CommentItemType[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (!comments?.length) return null;

  return (
    <>
      <header className="w-full border-t border-divider-default px-5">
        <h2 className="mt-[18px] flex items-center gap-1 py-2 text-body1-semibold text-layout-header-default">
          댓글<span>{comments.length}</span>
        </h2>
      </header>
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} data={comment} />
        ))}
      </div>

      <ViewMoreComment count={5} />
    </>
  );
};

export default CommentList;
