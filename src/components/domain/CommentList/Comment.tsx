import { Icon, KebabMenuButton, ProfileAvatar } from "@/components/common";

const CommentCard = () => {
  return (
    <div className="my-[18px] px-5">
      <div className="space-y-2">
        <div className="flex flex-col gap-3">
          {/* 댓글 메타 */}
          <div className="flex items-start justify-between">
            <div className="flex gap-[14px]">
              <ProfileAvatar size={40} />
              <div className="flex flex-col items-start">
                <p className="text-body1-medium text-layout-header-default">asdasdasd</p>
                <time dateTime="2025-05-06" className="text-body2-regular text-layout-body-default">
                  2025.05.06
                </time>
              </div>
            </div>
            <KebabMenuButton size="small" ariaLabel="댓글 메뉴" />
          </div>
          {/* 댓글 내용 */}
          <p className="text-body1-regular text-layout-header-default">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ex omnis ullam
            maiores nihil consequuntur!
          </p>
        </div>
        {/* 댓글 좋아요 */}
        <button className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder">
          <Icon name="CommentLikeIcon" size={16} /> <span>추천 12</span>
        </button>
      </div>

      {/* 답글 */}
      <div className="flex items-center gap-3 py-2">
        <button className="flex items-center gap-1">
          <span className="text-body1-medium text-layout-header-default">
            답글 <span>0</span>개
          </span>
          <Icon name="ArrowDownSmall" size={24} />
        </button>
        <button className="text-body1-medium text-neutral-strong-default">답글</button>
      </div>
    </div>
  );
};

export default CommentCard;
