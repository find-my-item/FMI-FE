import { Icon } from "@/components/common";
import { cn } from "@/utils";
import Link from "next/link";

const NoticeFloatingButton = () => {
  return (
    <div className="fixed-button-position">
      <Link
        href="/notice/write"
        aria-label="공지사항 글쓰기 페이지 이동"
        className={cn(
          "h-[70px] w-[70px] rounded-full p-3 transition-colors duration-150 flex-center",
          "glass-card bg-opacity-70 bg-fill-brand-normal-default",
          "hover:bg-fill-brand-strong-hover",
          "disabled:bg-fill-brand-strong-disabled"
        )}
      >
        <Icon name="Pencil" size={32} />
      </Link>
    </div>
  );
};

export default NoticeFloatingButton;
