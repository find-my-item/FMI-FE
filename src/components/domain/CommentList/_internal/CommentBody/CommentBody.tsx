interface CommentBodyProps {
  isNestedReply: boolean;
  bodyData: {
    replyNickname?: string;
    content: string;
  };
}

const CommentBody = ({ isNestedReply, bodyData }: CommentBodyProps) => {
  const { replyNickname, content } = bodyData;

  // 댓글 내용
  return (
    <p className="whitespace-pre-wrap break-all text-body1-regular text-layout-header-default">
      {isNestedReply && (
        <span className="inline-block pr-[6px] text-brand-normal-default">@{replyNickname}</span>
      )}
      {content}
    </p>
  );
};

export default CommentBody;
