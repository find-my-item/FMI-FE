"use client";

import { useState } from "react";
import { cn } from "@/utils";
import { Icon } from "@/components/common";
import { InquiryStatus, ReportStatus } from "@/types";
import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "@/app/(admin)/admin/_utils/AdminStatusBadgeConfig/AdminStatusBadgeConfig";
import { AdminDropdown } from "@/app/(admin)/admin/_components";
import { DETAIL_STATUS_CONFIG } from "./DETAIL_STATUS_CONFIG";
import { ReportsType } from "../../../_types/ReportsType";
import { useClickOutside } from "@/hooks";

interface DetailStatusHeaderProps {
  requestStatus: ReportStatus | InquiryStatus;
  status: boolean;
  type: ReportsType;
}

const DetailStatusHeader = ({ requestStatus, status, type }: DetailStatusHeaderProps) => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const { statusOptions } = DETAIL_STATUS_CONFIG[type];

  return (
    <div ref={ref} className="relative flex items-center gap-2">
      <button
        aria-label="상태 변경"
        className={cn(
          "flex items-center gap-1 rounded-full px-3 py-1 text-caption1-semibold",
          ProcessStatusBadgeConfig[requestStatus].className
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{ProcessStatusBadgeConfig[requestStatus].label}</span>
        <Icon name="ArrowDown" size={10} />
      </button>

      {open && (
        <AdminDropdown open={open} options={statusOptions} onSelect={() => {}} className="mt-2" />
      )}

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
