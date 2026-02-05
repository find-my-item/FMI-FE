import { MOCK_ADMIN_GUEST_INQUIRY_LIST } from "@/mock/data";
import { AdminReportsItem } from "../../../_components";
import { toGuestInquiryItemVM } from "../../../_utils/toReportsItemVM/toReportsItemVM";

const GuestInquiriesList = () => {
  return (
    <section aria-label="비회원 문의 목록">
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <AdminReportsItem
            key={index}
            data={toGuestInquiryItemVM(MOCK_ADMIN_GUEST_INQUIRY_LIST)}
          />
        ))}
      </ul>
    </section>
  );
};

export default GuestInquiriesList;
