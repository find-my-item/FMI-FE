import { ViewMoreComment } from "@/components/common";
import CommentItem from "./CommentItem";
import { useMemo } from "react";
import { CommentItemType } from "@/types";

interface CommentListProps {
  comments: CommentItemType[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (!comments.length) return null;

  const { parentComments, repliesMap } = useMemo(() => {
    const parents: CommentItemType[] = [];
    const replies: Record<number, CommentItemType[]> = {};

    comments.forEach((comment) => {
      if (comment.parentId) {
        const parentComment = comments.find((c) => c.id === comment.parentId);
        if (parentComment) {
          if (!replies[parentComment.id]) {
            replies[parentComment.id] = [];
          }
          replies[parentComment.id].push(comment);
        }
      } else {
        parents.push(comment);
      }
    });

    return { parentComments: parents, repliesMap: replies };
  }, [comments]);

  return (
    <>
      <header className="mb-[2px] w-full border-t border-[#E4E4E4] px-[20px]">
        <h2 className="mt-[26px] text-body1-semibold text-[#242424]">댓글 {comments.length}</h2>
      </header>
      <div>
        {parentComments.map((c) => (
          <CommentItem key={c.id} />
        ))}
      </div>

      <ViewMoreComment count={5} />
    </>
  );
};

export default CommentList;
