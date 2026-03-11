import { cn } from "@/utils";
import { Icon } from "@/components/common";
import { InquiryStatus, ReportStatus } from "@/types";
import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "@/app/(admin)/admin/_utils/AdminStatusBadgeConfig/AdminStatusBadgeConfig";

interface DetailStatusHeaderProps {
  requestStatus: ReportStatus | InquiryStatus;
  status: boolean;
}

const DetailStatusHeader = ({ requestStatus, status }: DetailStatusHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className={cn(
          "flex items-center gap-1 rounded-full px-3 py-1 text-caption1-semibold",
          ProcessStatusBadgeConfig[requestStatus].className
        )}
      >
        <span>{ProcessStatusBadgeConfig[requestStatus].label}</span>
        <Icon name="ArrowDown" size={10} />
      </button>

      <span
        className={cn(
          "rounded-full px-3 py-1 text-caption1-semibold",
          ReplyStatusBadgeConfig(status).className
        )}
      >
        {ReplyStatusBadgeConfig(status).label}
      </span>
    </div>
  );
};

export default DetailStatusHeader;
