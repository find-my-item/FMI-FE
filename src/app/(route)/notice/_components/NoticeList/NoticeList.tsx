import { Badge, Icon, ListItemImage } from "@/components/common";
import Link from "next/link";
import { NoticeItem } from "@/api/fetch/notice";
import { formatDate } from "@/utils";

const NoticeListItem = ({ notice }: { notice: NoticeItem }) => {
  const { noticeId, title, createdAt, likeCount, viewCount, thumbnailUrl } = notice;

  return (
    <li>
      <Link
        href={`/notice/${noticeId}`}
        className="flex min-w-0 items-center justify-between gap-2 border-b border-divider-default px-5 py-[30px] transition-colors hover:bg-flatGray-25"
      >
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-col gap-[3px]">
            <div className="flex items-center gap-1">
              <div className="flex-shrink-0">
                <Badge variant="new" />
              </div>
              <p className="truncate text-body1-semibold text-layout-header-default">{title}</p>
            </div>
            <time className="text-body2-regular text-layout-body-default">
              {formatDate(createdAt)}
            </time>
          </div>

          <div className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder">
            <Icon name="Like" size={16} className="text-border-divider-default" />
            <span>{likeCount}</span>
            <Icon name="Eye" size={16} className="text-border-divider-default" />
            <span>{viewCount}</span>
          </div>
        </div>

        {thumbnailUrl && (
          <div className="flex-shrink-0">
            <ListItemImage src={thumbnailUrl} alt="공지사항 게시글 썸네일" size={90} />
          </div>
        )}
      </Link>
    </li>
  );
};

const NoticeList = ({ notices }: { notices: NoticeItem[] }) => {
  return (
    <ul>
      {notices.map((notice) => (
        <NoticeListItem key={notice.noticeId} notice={notice} />
      ))}
    </ul>
  );
};

export default NoticeList;
