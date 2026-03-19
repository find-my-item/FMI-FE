// import { Chip } from "@/components/common";
// import Link from "next/link";
// import { MypageRequestType } from "../_types/MypageRequestType";
// import MypageEmptyUI from "../../MypageEmptyUI/MypageEmptyUI";
// import { formatDate } from "@/utils";
// import { LIST_STATUS_CHIP } from "../_constants/STATUS_CHIP";
// import { useGetUserReports } from "@/api/fetch/user";
// import { useFilterParams } from "@/hooks/domain";
// import { LoadingState } from "@/components/state";
// import { useEffect } from "react";
// import { useToast } from "@/context/ToastContext";

// // TODO(수현): api 연결시 데이터 타입 수정 예정
// interface DataType {
//   // listType: MypageRequestType,
//   reportId?: number;
//   inquiryId?: number;
//   status: "PENDING" | "RECEIVED" | "RESOLVED";
//   targetTitle: string;
//   createdAt: string;
//   reason: string;
// }

// interface MypageListLinkProps extends DataType {
//   listType: MypageRequestType;
// }

// const MypageListLink = ({ listType, ...props }: MypageListLinkProps) => {

//   return (
//     <Link
//       href={
//         listType === "reports"
//           ? `/mypage/reports/${props.reportId}`
//           : `/mypage/inquiries/${props.inquiryId}`
//       }
//     >
//       <Chip
//         label={LIST_STATUS_CHIP[props.status as keyof typeof LIST_STATUS_CHIP].label}
//         type={LIST_STATUS_CHIP[props.status as keyof typeof LIST_STATUS_CHIP].chipType}
//       />
//       <h3 className="mt-2 text-h3-semibold text-layout-header-default">{props.targetTitle}</h3>
//       <span className="mt-[3px] text-body2-regular text-layout-body-default">
//         {formatDate(props.createdAt)}
//       </span>
//       <p className="mt-2 truncate text-body2-regular text-neutral-normal-default">{props.reason}</p>
//     </Link>
//   );
// };

// interface BaseDataType {
//   status: "PENDING" | "RECEIVED" | "RESOLVED";
//   targetTitle: string;
//   createdAt: string;
//   reason: string;
//   reportId?: number;
//   inquiryId?: number;
// }

// interface MypageRequestListProps<T extends BaseDataType> {
//   listType: MypageRequestType;
//   data?: T[];
//   isLoading?: boolean;
//   isError?: boolean;
// }

// const MypageRequestList = <T extends BaseDataType>({
//   listType,
//   data = [],
//   isLoading,
//   isError,
// }: MypageRequestListProps<T>) => {
// const {addToast} = useToast();

// useEffect(() => {
//   if(isError ){
//     addToast("목록을 불러오는데 실패했어요", "error");
//   }
// }, [isError, addToast]);

//   if(isLoading) return <LoadingState />;

//   const sectionTitle = `내 ${listType === "reports" ? "신고" : "문의"} 내역 목록 영역`;

//   return (
//     <section>
//       <h2 className="sr-only">{sectionTitle}</h2>

//       {data && data.length === 0 ? (
//         <MypageEmptyUI pageType={listType} />
//       ) : (
//         <ul>
//           {data && data.map((item) => (
//             <li
//               key={item.reportId ?? item.inquiryId}
//               className="flex w-full flex-col justify-between border-b border-divider-default px-5 py-[30px]"
//             >
//               <MypageListLink listType={listType} {...item} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </section>
//   );
// };

// export default MypageRequestList;

import { Chip } from "@/components/common";
import Link from "next/link";
import { MypageRequestType } from "../_types/MypageRequestType";
import MypageEmptyUI from "../../MypageEmptyUI/MypageEmptyUI";
import { formatDate } from "@/utils";
import { REPORT_STATUS_CHIP, INQUIRY_STATUS_CHIP } from "../_constants/STATUS_CHIP";
import { LoadingState } from "@/components/state";
import { useEffect } from "react";
import { useToast } from "@/context/ToastContext";

// 1. 공통 데이터 인터페이스 (제네릭 제약 조건)
interface BaseDataType {
  status: string; // 도메인별로 status 값이 다르므로 string으로 포괄
  targetTitle: string;
  createdAt: string;
  reason: string;
  reportId?: number;
  inquiryId?: number;
}

interface MypageListLinkProps extends BaseDataType {
  listType: MypageRequestType;
}

const MypageListLink = ({ listType, ...props }: MypageListLinkProps) => {
  const statusConfigMap = listType === "reports" ? REPORT_STATUS_CHIP : INQUIRY_STATUS_CHIP;

  const config = statusConfigMap[props.status as keyof typeof statusConfigMap] ?? {
    label: "알 수 없음",
    chipType: "default",
  };

  return (
    <Link
      href={
        listType === "reports"
          ? `/mypage/reports/${props.reportId}`
          : `/mypage/inquiries/${props.inquiryId}`
      }
      // className="block"
    >
      <Chip label={config.label} type={config.chipType as any} />

      <h3 className="mt-2 text-h3-semibold text-layout-header-default">{props.targetTitle}</h3>

      <time
        dateTime={props.createdAt}
        className="mt-[3px] block text-body2-regular text-layout-body-default"
      >
        {formatDate(props.createdAt)}
      </time>

      <p className="mt-2 truncate text-body2-regular text-neutral-normal-default">{props.reason}</p>
    </Link>
  );
};

interface MypageRequestListProps<T extends BaseDataType> {
  listType: MypageRequestType;
  data?: T[];
  isLoading?: boolean;
  isError?: boolean;
}

const MypageRequestList = <T extends BaseDataType>({
  listType,
  data = [],
  isLoading,
  isError,
}: MypageRequestListProps<T>) => {
  const { addToast } = useToast();

  useEffect(() => {
    if (isError) {
      addToast("목록을 불러오는데 실패했어요", "error");
    }
  }, [isError, addToast]);

  if (isLoading) return <LoadingState />;

  const sectionTitle = `내 ${listType === "reports" ? "신고" : "문의"} 내역 목록 영역`;

  return (
    <section>
      <h2 className="sr-only">{sectionTitle}</h2>

      {data.length === 0 ? (
        <MypageEmptyUI pageType={listType} />
      ) : (
        <ul>
          {data.map((item) => (
            <li
              key={item.reportId ?? item.inquiryId}
              className="flex w-full flex-col justify-between border-b border-divider-default px-5 py-[30px]"
            >
              <MypageListLink listType={listType} {...(item as any)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MypageRequestList;
