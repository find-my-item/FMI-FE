import { Suspense } from "react";
import { formatDate } from "@/utils";
import { useGetDeletedUsers, WithdrawUserItem } from "@/api/fetch/admin";
import { LoadingState } from "@/components/state";

const AdminWithdrawalReasonList = () => {
  const { data } = useGetDeletedUsers({
    reason: "",
  });

  return (
    <Suspense fallback={<LoadingState />}>
      <section aria-label="유저 탈퇴 사유 목록">
        <ul>
          {data?.map((item) => (
            <WithdrawalReasonItem key={item.userId} data={item} />
          ))}
        </ul>
      </section>
    </Suspense>
  );
};

export default AdminWithdrawalReasonList;

const WithdrawalReasonItem = ({ data }: { data: WithdrawUserItem }) => {
  console.log("WithdrawalReasonItem: ", data);
  return (
    <li className="block space-y-2 border-b border-divider-default px-5 py-[30px]">
      <div className="space-y-1">
        <h3 className="text-h3-semibold text-layout-header-default">{data.nickname}</h3>
        <div className="flex text-body2-regular text-layout-body-default">
          <span className="after:mx-1 after:content-['·']">{data.email}</span>
          <time dateTime={data.deletedAt}>{formatDate(data.deletedAt)}</time>
        </div>
      </div>
      <div className="text-body1-regular text-brand-normal-default">
        {/* <ul className="space-y-[2px]">
          {data.withdrawalReason.map((reason: string, index: number) => (
            <li key={index}>- {reason}</li>
          ))}
        </ul> */}
      </div>
    </li>
  );
};
