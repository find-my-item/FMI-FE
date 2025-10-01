"use client";

import { useState } from "react";
import { NoticeCustomerState } from "./_types/noticeContainer";
import NoticeView from "./_components/NoticeView";
import { Tab } from "@/components";

const tabs = [
  { key: "notice", label: "공지사항" },
  { key: "customer", label: "고객센터" },
];

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
