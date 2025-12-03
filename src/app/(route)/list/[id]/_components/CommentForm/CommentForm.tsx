// TODO(지권): 삭제될 컴포넌트입니다.

import { Icon } from "@/components";

const CommentForm = () => {
  return (
    <form
      aria-label="댓글 입력 폼"
      className="sticky bottom-0 left-0 right-0 flex w-full items-center justify-between gap-[6px] border-t border-[#E4E4E4] bg-white px-5 py-4"
    >
      <div className="flex w-full items-center gap-2">
        <button type="button" className="rounded-full bg-[#F5F5F5] p-3" aria-label="이미지 추가">
          <Icon name="Image" size={20} aria-hidden="true" />
        </button>
        <label htmlFor="comment" className="sr-only">
          댓글 입력
        </label>
        <input
          id="comment"
          type="text"
          placeholder="댓글을 작성해 보세요."
          className="h-[44px] flex-1 rounded-full bg-[#F5F5F5] pl-5 pr-[30px] placeholder:text-[#9D9D9D]"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-[#98E3BD]/90 p-3 flex-center"
        aria-label="댓글 전송"
      >
        <Icon name="Send" size={20} aria-hidden="true" />
      </button>
    </form>
  );
};

export default CommentForm;
