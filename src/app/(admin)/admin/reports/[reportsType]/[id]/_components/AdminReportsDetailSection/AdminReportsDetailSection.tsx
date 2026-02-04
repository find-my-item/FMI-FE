import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "@/app/(admin)/admin/_utils/AdminStatusBadgeConfig/AdminStatusBadgeConfig";
import { Icon } from "@/components/common";
import { ReplyStatus, ReportsType } from "@/types";
import { cn, formatDate } from "@/utils";

interface AdminReportsDetailSectionProps {
  data: {
    title: string;
    userName: string;
    createdAt: string;
    content: string;
    status: ReportsType;
    replyStatus: ReplyStatus;
  };
}

const AdminReportsDetailSection = ({ data }: AdminReportsDetailSectionProps) => {
  const { title, userName, createdAt, content, status, replyStatus } = data;

  return (
    <section
      aria-label="신고/문의 내용"
      className="space-y-[14px] border-b border-flatGray-50 px-5 py-[30px]"
    >
      <div className="flex items-center gap-2">
        <button
          className={cn(
            "flex items-center gap-1 rounded-full px-3 py-1 text-caption1-semibold",
            ProcessStatusBadgeConfig[status].className
          )}
        >
          <span>{ProcessStatusBadgeConfig[status].label}</span> <Icon name="ArrowDown" size={10} />
        </button>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-caption1-semibold",
            ReplyStatusBadgeConfig[replyStatus].className
          )}
        >
          {ReplyStatusBadgeConfig[replyStatus].label}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex flex-col gap-1">
          {/* TODO(지권): 디자인 토큰 누락 */}
          <h2 className="text-[20px] font-semibold text-layout-header-default">{title}</h2>
          <div className="flex items-center text-body2-regular text-layout-body-default">
            <span className="block after:mx-1 after:content-['·']">{userName}</span>
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </div>
        </div>

        <p className="text-body1-regular text-layout-header-default">{content}</p>
      </div>
    </section>
  );
};

export default AdminReportsDetailSection;
