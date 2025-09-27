"use client";

import { useState } from "react";
import NoticeTab from "./_components/NoticeTab";
import { NoticeCustomerState } from "./_types/noticeContainer";
import NoticeView from "./_components/NoticeView";

const Notice = () => {
  const [noticeCustomerState, setNoticeCustomerState] = useState<NoticeCustomerState>("notice");

  return (
    <div className="h-[600px] w-full">
      <NoticeTab
        noticeCustomerState={noticeCustomerState}
        setNoticeCustomerState={setNoticeCustomerState}
      />
      <NoticeView noticeCustomerState={noticeCustomerState} />
    </div>
  );
};

export default Notice;
