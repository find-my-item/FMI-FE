import { DetailHeader } from "@/components/layout";
import { NoticeFloatingButton, NoticeView } from "./_components";

const Notice = () => {
  return (
    <>
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">공지사항 목록</h1>
      <NoticeView />
      <NoticeFloatingButton />
    </>
  );
};

export default Notice;
