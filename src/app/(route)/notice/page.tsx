import { NoticeFloatingButton, NoticeView } from "./_components";
import { DetailHeader } from "@/components/layout";

const Notice = () => {
  return (
    <div className="h-base">
      <DetailHeader title="공지사항" />
      <NoticeView />
      <NoticeFloatingButton />
    </div>
  );
};

export default Notice;
