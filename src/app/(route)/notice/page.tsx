import { NoticeFloatingButton, NoticeView } from "./_components";
import { DetailHeader } from "@/components/layout";

const Notice = () => {
  return (
    <div className="h-base">
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">공지사항 목록</h1>
      <NoticeView />
      <NoticeFloatingButton />
    </div>
  );
};

export default Notice;
