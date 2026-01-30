interface CommentBodyProps {
  isNestedReply: boolean;
  commentData: {
    replyNickname?: string;
    content: string;
  };
}

const CommentBody = ({ isNestedReply, commentData }: CommentBodyProps) => {
  const { replyNickname, content } = commentData;

  // 댓글 내용
  return (
    <p className="text-body1-regular text-layout-header-default">
      {isNestedReply && (
        <span className="inline-block pr-[6px] text-brand-normal-default">@{replyNickname}</span>
      )}
      {content}
    </p>
  );
};

export default CommentBody;
