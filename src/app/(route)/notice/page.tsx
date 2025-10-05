"use client";

import { useState } from "react";
import { NoticeCustomerState } from "./_types/noticeContainer";
import NoticeView from "./_components/NoticeView";
import { Tab } from "@/components";
import { tabs } from "./_constant/noticeTab";

const Notice = () => {
  const [noticeCustomerState, setNoticeCustomerState] = useState<NoticeCustomerState>("notice");

  return (
    <div className="w-full">
      <Tab
        onValueChange={(key: string) => setNoticeCustomerState(key as NoticeCustomerState)}
        tabs={tabs}
        selected={noticeCustomerState}
      />
      <NoticeView noticeCustomerState={noticeCustomerState} />
    </div>
  );
};

export default Notice;
