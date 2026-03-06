import { Badge, Icon, ListItemImage } from "@/components/common";
import Link from "next/link";
import { noticeListObject } from "../../_constant/noticeListObject";

type NoticeItem = (typeof noticeListObject)[number];

const NoticeItem = ({ notice }: { notice: NoticeItem }) => {
  return (
    <li>
      <Link
        href={`/notice/${notice.id}`}
        className="flex min-w-0 items-center gap-2 border-b border-divider-default px-5 py-[30px] transition-colors hover:bg-flatGray-25"
      >
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-col gap-[3px]">
            <div className="flex items-center gap-1">
              <div className="flex-shrink-0">
                <Badge variant="new" />
              </div>
              <p className="truncate text-body1-semibold text-layout-header-default">
                {notice.title}
              </p>
            </div>
            <time className="text-body2-regular text-layout-body-default">
              {"date" in notice && notice.date ? notice.date : "2025.10.15"}
            </time>
          </div>

          <div className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder">
            <Icon name="Like" size={16} className="text-border-divider-default" />
            <span>12</span>
            <Icon name="Eye" size={16} className="text-border-divider-default" />
            <span>24</span>
          </div>
        </div>
        {/* TODO(형준): API 연동 시 이미지 처리 필요 */}
        {/* <div className="flex-shrink-0">
          <ListItemImage alt="공지사항 게시글 썸네일" size={90} category="BAG" />
        </div> */}
      </Link>
    </li>
  );
};

const NoticeList = () => {
  return (
    <ul>
      {noticeListObject.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}
    </ul>
  );
};

export default NoticeList;
