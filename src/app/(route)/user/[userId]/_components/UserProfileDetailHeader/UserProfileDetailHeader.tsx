"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ReportModal } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { HeaderMenu } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { cn } from "@/utils";
import { useHandleClickOutside } from "@/app/(route)/chat/hooks";

const UserProfileDetailHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const { userId } = useParams<{ userId: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside(isMenuOpen, containerRef, dropdownRef, setIsMenuOpen);

  return (
    <div className="relative" ref={containerRef}>
      <DetailHeader title="프로필">
        <HeaderMenu ariaLabel="더보기 메뉴" onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </DetailHeader>
      {isMenuOpen && (
        <div
          ref={dropdownRef}
          role="button"
          className={cn(
            "absolute left-[65%] top-[90%] z-10 mt-2 cursor-pointer px-7 py-4",
            "border border-white bg-fill-neutral-subtle-default",
            "h-[57px] w-[119px] text-nowrap rounded-[20px] shadow-sm"
          )}
          onClick={() => setIsReportOpen(true)}
        >
          <span className="text-h3-medium text-system-warning">신고하기</span>
        </div>
      )}

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="USER"
        targetId={Number(userId)}
      />
    </div>
  );
};

export default UserProfileDetailHeader;
