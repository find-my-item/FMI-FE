import { Button } from "@/components/common";
import { MOCK_GUEST_INQUIRY_DETAIL_DATA } from "@/mock/data";
import { AdminDetailSection } from "@/app/(admin)/admin/_components";

const GuestInquiriesDetailView = () => {
  return (
    <div className="flex flex-col h-base">
      <section className="flex-1">
        <AdminDetailSection data={MOCK_GUEST_INQUIRY_DETAIL_DATA} />
      </section>

      <section className="border-t border-divider-default px-5 pb-8 pt-3">
        <Button className="min-h-11 w-full">이메일 복사하기</Button>
      </section>
    </div>
  );
};

export default GuestInquiriesDetailView;
