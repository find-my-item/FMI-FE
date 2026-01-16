import { Icon } from "@/components/common";

const MypageCommentsList = () => {
  return (
    <section>
      <h2 className="sr-only">댓글 목록 영역</h2>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex w-full flex-col border-b border-divider-default px-5 py-[30px]"
        >
          <span>
            <span className="text-brand-normal-default">@대댓글 사용자 </span>
            여기 댓글 내용이 표시 됨
          </span>
          <span className="text-body2-regular text-layout-body-default">2026.01.15</span>
          <span className="flex text-body2-regular text-neutral-strong-placeholder">
            <Icon name="Star" size={16} />
            12
          </span>
        </div>
      ))}
    </section>
  );
};

export default MypageCommentsList;
