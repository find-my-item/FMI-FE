"use client";

import { useEffect, useState } from "react";
import { NoticeCustomerState } from "./_types/noticeContainer";
import NoticeView from "./_components/NoticeView/NoticeView";
import { DetailHeader } from "@/components/layout";
import { Tab } from "@/components/domain";
import { tabs } from "./_constant/noticeTab";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Notice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as NoticeCustomerState;
  const [noticeCustomerState, setNoticeCustomerState] = useState<NoticeCustomerState>(
    tab ?? "notice"
  );

  useEffect(() => {
    if (tab && tab !== noticeCustomerState) {
      setNoticeCustomerState(tab);
    }
  }, [tab]);

  const onChangeTab = (tab: NoticeCustomerState) => {
    setNoticeCustomerState(tab);
    router.push(`/notice?tab=${tab}`);
  };

  return (
    <div className="w-full">
      <DetailHeader title={noticeCustomerState === "notice" ? "공지사항" : "고객센터"} />
      <Tab onValueChange={onChangeTab} tabs={tabs} selected={noticeCustomerState} />
      <NoticeView noticeCustomerState={noticeCustomerState} />
    </div>
  );
};

export default Notice;
