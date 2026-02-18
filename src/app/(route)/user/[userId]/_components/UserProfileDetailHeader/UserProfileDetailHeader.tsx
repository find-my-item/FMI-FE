"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ReportModal } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { HeaderMenu } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { cn } from "@/utils";

const UserProfileDetailHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="relative w-full">
      <DetailHeader title="프로필">
        <HeaderMenu ariaLabel="더보기 메뉴" onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </DetailHeader>
      {isMenuOpen && (
        <button
          className={cn(
            "glass-card absolute left-[65%] right-0 top-[60%] z-10 mt-2 max-w-[119px]",
            "text-nowrap rounded-[20px] px-7 py-4 shadow-sm",
            "border border-white bg-fill-neutral-subtle-default"
          )}
          onClick={() => setIsReportOpen(true)}
        >
          <span className="text-h3-medium text-system-warning">신고하기</span>
        </button>
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
