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
      <header className="w-full border-t border-divider-default px-5">
        <h2 className="mt-[18px] flex items-center gap-1 py-2 text-body1-semibold text-layout-header-default">
          댓글<span>{comments.length}</span>
        </h2>
      </header>
      <div>
        {parentComments.map((_, index) => (
          <CommentItem key={index} />
        ))}
      </div>

      <ViewMoreComment count={5} />
    </>
  );
};

export default CommentList;
