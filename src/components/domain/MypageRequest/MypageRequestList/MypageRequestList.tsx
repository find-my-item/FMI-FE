import { Chip } from "@/components/common";
import Link from "next/link";
import { MypageRequestType } from "../_types/MypageRequestType";
import MypageEmptyUI from "../../MypageEmptyUI/MypageEmptyUI";
import { formatDate } from "@/utils";
import { LIST_STATUS_CHIP } from "../_constants/LIST_STATUS_CHIP";

// TODO(수현): api 연결시 데이터 타입 수정 예정
interface DataType {
  // listType: MypageRequestType,
  reportId?: number;
  inquiryId?: number;
  status: "PENDING" | "RECEIVED" | "RESOLVED";
  targetTitle: string;
  createdAt: string;
  reason: string;
}

interface MypageListLinkProps extends DataType {
  listType: MypageRequestType;
}

const MypageListLink = ({ listType, ...props }: MypageListLinkProps) => {
  return (
    <Link
      href={
        listType === "reports"
          ? `/mypage/reports/${props.reportId}`
          : `/mypage/inquiries/${props.inquiryId}`
      }
    >
      <Chip
        label={LIST_STATUS_CHIP[props.status as keyof typeof LIST_STATUS_CHIP].label}
        type={LIST_STATUS_CHIP[props.status as keyof typeof LIST_STATUS_CHIP].type}
      />
      <h3 className="mt-2 text-h3-semibold text-layout-header-default">{props.targetTitle}</h3>
      <span className="mt-[3px] text-body2-regular text-layout-body-default">
        {formatDate(props.createdAt)}
      </span>
      <p className="mt-2 truncate text-body2-regular text-neutral-normal-default">{props.reason}</p>
    </Link>
  );
};

interface MypageRequestListProps {
  listType: MypageRequestType;
  data: readonly DataType[];
}

const MypageRequestList = ({ listType, data }: MypageRequestListProps) => {
  const sectionTitle = `내 ${listType === "reports" ? "신고" : "문의"} 내역 목록 영역`;

  return (
    <section>
      <h2 className="sr-only">{sectionTitle}</h2>
      <ul>
        {data.map((item) => (
          <li
            key={item.reportId ?? item.inquiryId}
            className="flex w-full flex-col justify-between border-b border-divider-default px-5 py-[30px]"
          >
            <MypageListLink listType={listType} {...item} />
          </li>
        ))}
      </ul>

      {data.length === 0 && <MypageEmptyUI pageType={listType} />}
    </section>
  );
};

export default MypageRequestList;
