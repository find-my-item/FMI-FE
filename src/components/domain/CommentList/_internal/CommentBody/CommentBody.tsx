interface CommentBodyProps {
  bodyData: {
    content: string;
  };
}

const CommentBody = ({ bodyData }: CommentBodyProps) => {
  const { content } = bodyData;

  // 댓글 내용
  return (
    <p className="whitespace-pre-wrap break-all text-body1-regular text-layout-header-default">
      {content}
    </p>
  );
};

export default CommentBody;
