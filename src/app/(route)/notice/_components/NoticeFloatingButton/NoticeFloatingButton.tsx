import { Icon } from "@/components/common";
import { cn } from "@/utils";

const NoticeFloatingButton = ({ disabled = false }: { disabled?: boolean }) => {
  return (
    <div className="fixed-button-position">
      <button
        aria-label="공지사항 글쓰기 페이지 이동"
        className={cn(
          "h-[70px] w-[70px] rounded-full p-3 transition-colors duration-150 flex-center",
          "glass-card bg-opacity-70 bg-fill-brand-normal-default",
          "hover:bg-fill-brand-strong-hover",
          "disabled:bg-fill-brand-strong-disabled"
        )}
        disabled={disabled}
      >
        <Icon name="Pencil" size={32} />
      </button>
    </div>
  );
};

export default NoticeFloatingButton;
