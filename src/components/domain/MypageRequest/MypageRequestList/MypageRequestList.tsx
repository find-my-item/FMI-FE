import { Chip } from "@/components/common";
import Link from "next/link";
import { MypageRequestType } from "../_types/MypageRequestType";
import MypageEmptyUI from "../../MypageEmptyUI/MypageEmptyUI";
import { formatDate } from "@/utils";
import { LIST_STATUS_CHIP } from "../_constants/LIST_STATUS_CHIP";

interface MypageRequestListProps {
  status: MypageRequestType;
  // TODO(수현): api 연결시 데이터 타입 수정 예정
  data: readonly {
    reportId?: number;
    inquiryId?: number;
    status: "PENDING" | "RECEIVED" | "RESOLVED";
    targetTitle: string;
    createdAt: string;
    reason: string;
  }[];
}

const MypageRequestList = ({ status, data }: MypageRequestListProps) => {
  const sectionTitle = status === "reports" ? "내 신고 내역 목록 영역" : "내 문의 내역 목록 영역";

  return (
    <section>
      <h2 className="sr-only">{sectionTitle}</h2>
      <ul>
        {data.map((item) => (
          <li
            key={item.reportId ?? item.inquiryId}
            className="flex w-full flex-col justify-between border-b border-divider-default px-5 py-[30px]"
          >
            <Link
              href={
                status === "reports"
                  ? `/mypage/reports/${item.reportId}`
                  : `/mypage/inquiries/${item.inquiryId}`
              }
            >
              <Chip
                label={LIST_STATUS_CHIP[item.status as keyof typeof LIST_STATUS_CHIP].label}
                type={LIST_STATUS_CHIP[item.status as keyof typeof LIST_STATUS_CHIP].type}
              />
              <h3 className="mt-2 text-h3-semibold text-layout-header-default">
                {item.targetTitle}
              </h3>
              <span className="mt-[3px] text-body2-regular text-layout-body-default">
                {formatDate(item.createdAt)}
              </span>
              <p className="mt-2 truncate text-body2-regular text-neutral-normal-default">
                {item.reason}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {data.length === 0 && <MypageEmptyUI pageType={status} />}
    </section>
  );
};

export default MypageRequestList;
