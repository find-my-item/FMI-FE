import Link from "next/link";
import { ReplyStatus, ReportStatus } from "@/types";
import { cn } from "@/utils";
import { ReplyStatusBadgeConfig, ReportStatusBadgeConfig } from "./BADGE_CONFIG";

const AdminReportsItem = ({
  status,
  replyStatus,
}: {
  status: ReportStatus;
  replyStatus: ReplyStatus;
}) => {
  return (
    <li className="after:block after:border-b after:border-divider-default after:content-['']">
      <Link href="/admin/reports/1" className="block space-y-2 px-5 py-[30px]">
        <div className="flex gap-2 text-caption1-semibold">
          <span className={cn("rounded-full px-3 py-1", ReportStatusBadgeConfig[status].className)}>
            {ReportStatusBadgeConfig[status].label}
          </span>
          <span
            className={cn("rounded-full px-3 py-1", ReplyStatusBadgeConfig[replyStatus].className)}
          >
            {ReplyStatusBadgeConfig[replyStatus].label}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="truncate text-h3-semibold text-layout-header-default">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, eveniet dolore. Eum
            ducimus possimus iusto.
          </h2>
          <div className="text-body2-regular text-layout-body-default">
            <span className="after:mx-[2px] after:content-['·']">닉네임최대열글자확인</span>
            <span>2025.10.20</span>
          </div>
          <p className="truncate text-body2-regular text-neutral-normal-default">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
          </p>
        </div>
      </Link>
    </li>
  );
};

export default AdminReportsItem;
