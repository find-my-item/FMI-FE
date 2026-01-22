import { Chip, Icon } from "@/components/common";
import Link from "next/link";

const MypageRequestEmptyUI = () => {
  return (
    <div className="gap-5 py-20 flex-col-center">
      <Icon name="NoReports" size={70} />
      <h2 className="text-h2-bold text-layout-header-default">신고 내역이 없어요</h2>
      <p className="text-body2-regular text-layout-body-default">
        아직 신고한 내역이 없습니다. <br />
        이용 중 불편 사항이 있을 경우 신고할 수 있어요.
      </p>
    </div>
  );
};

const LIST_CHIP = {
  PENDING: { label: "접수", type: "pending" },
  RECEIVED: { label: "처리 중", type: "received" },
  RESOLVED: { label: "처리 완료", type: "resolved" },
} as const;

interface MypageRequestListProps {}

const MypageRequestList = () => {
  return (
    <section>
      <h2 className="sr-only">내 신고 내역 목록 영역</h2>
      <ul>
        {MOCK_MYPAGE_REPORTS_ITEM.map((item) => (
          <li
            key={item.reportId}
            className="flex w-full flex-col justify-between border-b border-divider-default px-5 py-[30px]"
          >
            <Link href={`/mypage/reports/${item.reportId}`}>
              <Chip
                label={LIST_CHIP[item.status as keyof typeof LIST_CHIP].label}
                type={LIST_CHIP[item.status as keyof typeof LIST_CHIP].type}
              />
              <h3 className="mt-2 text-h3-semibold text-layout-header-default">
                {item.targetTitle}
              </h3>
              <span className="mt-[3px] text-body2-regular text-layout-body-default">
                {item.createdAt}
              </span>
              <p className="mt-2 text-body2-regular text-neutral-normal-default">{item.reason}</p>
            </Link>
          </li>
        ))}
      </ul>

      {MOCK_MYPAGE_REPORTS_ITEM.length === 0 && <MypageRequestEmptyUI />}
    </section>
  );
};

export default MypageRequestList;
