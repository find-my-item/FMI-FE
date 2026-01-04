import { ViewMoreComment } from "@/components/common";
import CommentItem from "./CommentItem";
import { useMemo } from "react";
import type { Comment } from "./types/commentItem";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (!comments.length) return null;

  const { parentComments, repliesMap } = useMemo(() => {
    const parents: Comment[] = [];
    const replies: Record<number, Comment[]> = {};

    comments.forEach((comment) => {
      if (comment.replyTo) {
        const parentComment = comments.find((c) => c.author === comment.replyTo);
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
          <CommentItem key={c.id} comment={c} replies={repliesMap[c.id] || []} />
        ))}
      </div>
      <div className="border-b pb-[18px] pt-[24px]">
        <ViewMoreComment text="댓글 5개" />
      </div>
    </>
  );
};

export default CommentList;
