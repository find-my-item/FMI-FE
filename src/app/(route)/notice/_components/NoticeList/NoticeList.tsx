import { Badge, Icon } from "@/components/common";
import Link from "next/link";

const NoticeItem = () => {
  return (
    <li>
      <Link
        href="/notice/1"
        className="flex flex-col gap-2 border-b border-divider-default px-5 py-[30px] transition-colors hover:bg-flatGray-25"
      >
        <div className="flex flex-col gap-[3px]">
          <div className="flex items-center gap-1">
            <Badge variant="new" />
            <p className="text-body1-semibold text-layout-header-default">[공지] 공지사항 제목</p>
          </div>
          <time className="text-body2-regular text-layout-body-default">2025.10.15</time>
        </div>

        <div className="flex items-center gap-1 text-body2-regular text-neutral-strong-placeholder">
          <Icon name="Like" size={16} className="text-[#D9D9D9]" />
          <span>12</span>
          <Icon name="Eye" size={16} className="text-[#D9D9D9]" />
          <span>24</span>
        </div>
      </Link>
    </li>
  );
};

const NoticeList = () => {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, index) => (
        <NoticeItem key={index} />
      ))}
    </ul>
  );
};

export default NoticeList;
