import { Suspense } from "react";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { MOCK_ADMIN_GUEST_INQUIRY_LIST } from "@/mock/data";
import { AdminReportsItem } from "../../../_components";
import { toGuestInquiryItemVM } from "../../../_utils/toReportsItemVM/toReportsItemVM";
import { EmptyState, LoadingState } from "@/components/state";

const GuestInquiriesList = () => {
  return (
    <section aria-label="비회원 문의 목록">
      <ErrorBoundary>
        <Suspense fallback={<LoadingState />}>
          {/* TODO(지권): 데이터가 없을 때 표시 */}
          {/* <EmptyState
            icon={{ iconName: "EyeOpen", iconSize: 70 }}
            title="등록된 문의 내역이 없어요"
            description={"아직 문의 내역이 없습니다.\n문의가 접수되면 이곳에 표기됩니다."}
          /> */}

          <ul>
            {Array.from({ length: 5 }).map((_, index) => (
              <AdminReportsItem
                key={index}
                data={toGuestInquiryItemVM(MOCK_ADMIN_GUEST_INQUIRY_LIST)}
              />
            ))}
          </ul>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default GuestInquiriesList;
