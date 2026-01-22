import { Chip } from "@/components/common";
import Link from "next/link";
import { MypageRequestType } from "../_internal/MypageRequestType";
import MypageEmptyUI from "../../MypageEmptyUI/MypageEmptyUI";
import { formatDate } from "@/utils";

const LIST_STATUS_CHIP = {
  PENDING: { label: "접수", type: "pending" },
  RECEIVED: { label: "처리 중", type: "received" },
  RESOLVED: { label: "처리 완료", type: "resolved" },
} as const;

interface MypageRequestListProps {
  status: MypageRequestType;
  // TODO(수현): api 연결시 데이터 타입 수정 예정
  data: readonly {
    reportId?: number;
    inquiriesId?: number;
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
            key={item.reportId ?? item.inquiriesId}
            className="flex w-full flex-col justify-between border-b border-divider-default px-5 py-[30px]"
          >
            <Link
              href={
                status === "reports"
                  ? `/mypage/$reports/${item.reportId}`
                  : `/mypage/$inquiries/${item.inquiriesId}`
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

      {data.length === 0 && (
        <MypageEmptyUI
          IconName="NoReports"
          titleText="신고 내역"
          subText="이용 중 불편 사항이 있을 경우 신고할 수 있어요."
        />
      )}
    </section>
  );
};

export default MypageRequestList;
