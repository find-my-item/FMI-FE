import { formatDate } from "@/utils";
import { WithdrawReasonItem } from "@/api/fetch/admin";
import { MOCK_WITHDRAW_REASON_LIST } from "@/mock/data";

const AdminWithdrawalReasonList = () => {
  return (
    <section aria-label="유저 탈퇴 사유 목록">
      <ul>
        {MOCK_WITHDRAW_REASON_LIST.map((item) => (
          <WithdrawalReasonItem key={item.id} data={item} />
        ))}
      </ul>
    </section>
  );
};

export default AdminWithdrawalReasonList;

const WithdrawalReasonItem = ({ data }: { data: WithdrawReasonItem }) => {
  return (
    <li className="block space-y-2 border-b border-divider-default px-5 py-[30px]">
      <div className="space-y-1">
        <h3 className="text-h3-semibold text-layout-header-default">{data.nickname}</h3>
        <div className="flex text-body2-regular text-layout-body-default">
          <span className="after:mx-1 after:content-['·']">{data.email}</span>
          <time dateTime={data.createdAt}>{formatDate(data.createdAt)}</time>
        </div>
      </div>
      <div className="text-body1-regular text-brand-normal-default">
        <ul className="space-y-[2px]">
          {data.reasons.map((reason, index) => (
            <li key={index}>- {reason}</li>
          ))}
        </ul>
      </div>
    </li>
  );
};
