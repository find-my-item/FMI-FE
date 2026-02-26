import { Suspense } from "react";
import { useGetDeletedUsers, WithdrawUserItem } from "@/api/fetch/admin";
import { LoadingState } from "@/components/state";
import { useInfiniteScroll } from "@/hooks";
import { formatDate } from "@/utils";
import { WITHDRAWAL_REASON_OPTIONS } from "../../_constants/WITHDRAWAL_REASON_OPTIONS";
import { WithdrawalReasonType } from "../../_types/WithdrawalReasonType";

// TODO(지권): 무한스크롤 cursor 기반 변경 후 추가 예정
// TODO(지권): data.withdrawalReason 배열로 변경 후 수정 예정
const AdminWithdrawalReasonList = ({ reason }: { reason: WithdrawalReasonType }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetDeletedUsers({
    reason,
  });
  // const { ref: listRef } = useInfiniteScroll({
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // });

  return (
    <Suspense fallback={<LoadingState />}>
      <section aria-label="유저 탈퇴 사유 목록">
        <ul>
          {data?.map((item) => (
            <WithdrawalReasonItem key={item.userId} data={item} />
          ))}
        </ul>
        {/* {hasNextPage && <div ref={listRef} className="h-10 w-full" />} */}
      </section>
    </Suspense>
  );
};

export default AdminWithdrawalReasonList;

const WithdrawalReasonItem = ({ data }: { data: WithdrawUserItem }) => {
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
        <ul className="space-y-[2px]">
          {/* {data.withdrawalReason.map((reason: string, index: number) => (
            <li key={index}>- {reason}</li>
          ))} */}
          <li>
            -
            {WITHDRAWAL_REASON_OPTIONS.find((opt) => opt.value === data.withdrawalReason)?.label ??
              "확인할 수 없어요."}
          </li>
        </ul>
      </div>
    </li>
  );
};
