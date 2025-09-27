import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { NoticeCustomerState } from "../_types/noticeContainer";
import { tabs } from "../_constant/noticeTab";

interface NoticeTab {
  noticeCustomerState: NoticeCustomerState;
  setNoticeCustomerState: Dispatch<SetStateAction<NoticeCustomerState>>;
}

const NoticeTab = ({ noticeCustomerState, setNoticeCustomerState }: NoticeTab) => {
  return (
    <div className="flex justify-between">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setNoticeCustomerState(tab.value)}
          className={clsx(
            "w-1/2 p-2 border-b-2 text-sm font-semibold",
            noticeCustomerState === tab.value && "border-b-green-500"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NoticeTab;
