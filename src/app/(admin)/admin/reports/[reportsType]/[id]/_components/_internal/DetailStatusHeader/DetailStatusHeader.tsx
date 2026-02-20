import { cn } from "@/utils";
import { Icon } from "@/components/common";
import { ReplyStatus, ReportsType } from "@/types";
import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "@/app/(admin)/admin/_utils/AdminStatusBadgeConfig/AdminStatusBadgeConfig";

interface DetailStatusHeaderProps {
  status: ReportsType;
  replyStatus: ReplyStatus;
}

const DetailStatusHeader = ({ status, replyStatus }: DetailStatusHeaderProps) => {
  return (
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
  );
};

export default DetailStatusHeader;
