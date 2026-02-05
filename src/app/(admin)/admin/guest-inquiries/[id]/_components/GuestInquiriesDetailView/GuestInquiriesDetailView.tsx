"use client";

import { Button } from "@/components/common";
import { useToast } from "@/context/ToastContext";
import { MOCK_GUEST_INQUIRY_DETAIL_DATA } from "@/mock/data";
import { AdminDetailSection } from "@/app/(admin)/admin/_components";

const GuestInquiriesDetailView = () => {
  const { addToast } = useToast();

  const copyEmail = () => {
    try {
      navigator.clipboard.writeText(MOCK_GUEST_INQUIRY_DETAIL_DATA.userName);
      addToast("이메일을 클립보드에 복사했어요", "success");
    } catch (error) {
      console.error(error);
      addToast("이메일 복사에 실패했어요", "error");
    }
  };

  return (
    <div className="flex flex-col h-base">
      <article className="flex-1">
        <AdminDetailSection data={MOCK_GUEST_INQUIRY_DETAIL_DATA} />
      </article>

      <div className="sticky bottom-0 border-t border-divider-default bg-white px-5 pb-8 pt-3">
        <Button className="min-h-11 w-full" onClick={copyEmail}>
          이메일 복사하기
        </Button>
      </div>
    </div>
  );
};

export default GuestInquiriesDetailView;
