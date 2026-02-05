import Link from "next/link";
import { Icon } from "@/components/common";
import { cn } from "@/utils";

const WriteNoticeFloatingButton = () => {
  return (
    <Link
      href={"/admin/write/notice"}
      aria-label="공지사항 작성"
      className={cn(
        "fixed bottom-[30px] right-5",
        "h-[70px] w-[70px] rounded-full p-[19px] bg-fill-brand-normal-default"
      )}
    >
      <Icon name="Pencil" size={32} />
    </Link>
  );
};

export default WriteNoticeFloatingButton;
