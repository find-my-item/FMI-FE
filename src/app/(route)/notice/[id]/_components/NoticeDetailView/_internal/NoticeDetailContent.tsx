import { NoticeDetail } from "@/api/fetch/notice";
import { Icon } from "@/components/common";
import { cn, formatDate } from "@/utils";
import Image from "next/image";

const BADGE_DEFAULT_STYLE = "inline-block rounded-full px-2 py-1 text-caption2-medium text-white";

const NoticeDetailBadges = ({ isNew, isHot }: { isNew: boolean; isHot: boolean }) => {
  if (!isNew && !isHot) return null;

  return (
    <div className="flex items-center gap-1">
      {isNew && <div className={cn(BADGE_DEFAULT_STYLE, "bg-fill-brand-normal-default")}>NEW</div>}
      {isHot && <div className={cn(BADGE_DEFAULT_STYLE, "bg-system-favorite")}>HOT</div>}
    </div>
  );
};

const NoticeDetailContent = ({ noticeDetail }: { noticeDetail?: NoticeDetail }) => {
  if (!noticeDetail) return null;
  const { title, content, viewCount, likeCount, authorName, isNew, isHot, createdAt, images } =
    noticeDetail;

  return (
    <section className="space-y-3 px-5 py-[30px]">
      <NoticeDetailBadges isNew={isNew} isHot={isHot} />

      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-h2-bold text-layout-header-default">{title}</h1>
          <div className="text-body2-regular text-layout-body-default">
            <time dateTime={createdAt} className="after:mx-2 after:content-['·']">
              {formatDate(createdAt)}
            </time>
            <span>{authorName}</span>
          </div>
        </div>
        <p className="whitespace-pre-line text-body1-regular text-layout-header-default">
          {content}
        </p>
        {/* TODO(형준): 이미지 임시 스타일 적용 상태, 피그마 디자인 추가 시 변경 필요 */}
        {images &&
          images.map((image) => (
            <div key={image} className="relative aspect-square w-full">
              <Image
                src={image}
                alt="공지사항 상세 이미지"
                fill
                className="rounded-2xl object-contain"
              />
            </div>
          ))}

        <div className="flex gap-3 text-body2-regular text-neutral-strong-placeholder">
          <button aria-label="좋아요 버튼" className="flex items-center gap-1">
            <Icon name="Like" size={16} className="text-border-divider-default" />
            {/* TODO(형준): 공지사항 상세 응답 값 likeStatus 추가 확인 후 추천 기능 작업 필요 */}
            <span>추천 {likeCount}</span>
          </button>
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={16} className="text-border-divider-default" />
            <span>조회 {viewCount}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeDetailContent;
