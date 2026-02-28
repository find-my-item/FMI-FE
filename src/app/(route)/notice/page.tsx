"use client";

import NoticeView from "./_components/NoticeView/NoticeView";
import { DetailHeader } from "@/components/layout";

const Notice = () => {
  return (
    <div className="w-full">
      <DetailHeader title="공지사항" />
      <NoticeView />
    </div>
  );
};

export default Notice;
