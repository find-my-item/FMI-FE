import { DetailHeader } from "@/components/layout";
import { NoticeView } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">관리자 공지사항</h1>

      <NoticeView />
    </>
  );
};

export default page;
