interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  replyTo?: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (!comments.length) return null;

  return (
    <>
      <header className="mb-[20px] w-full border-t border-[#E4E4E4] px-[20px]">
        <h2 className="mt-[27px] font-semibold text-[#242424]">댓글 {comments.length}</h2>
      </header>

      {comments.map((c, idx) => (
        <section
          key={c.id}
          className={`space-y-[12px] px-[20px] ${
            c.replyTo ? "mt-[22px] pl-[40px]" : idx === 0 ? "" : "mt-[22px]"
          }`}
        >
          <div className="flex gap-[16px]">
            <div className="h-[40px] w-[40px] rounded-full bg-gray-300"></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#242424]">{c.author}</p>
              <time className="text-[14px] text-[#9D9D9D]">{c.date}</time>
            </div>
          </div>
          <p className="leading-[22px] text-[#242424]">
            {c.replyTo && <span className="mr-1 text-green-600">@{c.replyTo}</span>}
            {c.content}
          </p>
        </section>
      ))}

      <footer className="flex h-[60px] items-center justify-center border-b border-[#E4E4E4]">
        <button className="text-[#1EB87B]">댓글 더보기</button>
      </footer>
    </>
  );
};

export default CommentList;
