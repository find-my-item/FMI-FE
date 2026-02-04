import { MOCK_NOTICE_LIST } from "@/mock/data";
import { AdminListItem } from "../../../_components";

const NoticeList = () => {
  return (
    <section aria-label="공지사항 목록" className="">
      <ul>
        {Array.from({ length: 10 }).map((_, index) => (
          <AdminListItem
            key={index}
            data={MOCK_NOTICE_LIST}
            imageAlt="공지사항 이미지"
            link={`/notice/${MOCK_NOTICE_LIST.items.noticeId}`}
          />
        ))}
      </ul>
    </section>
  );
};

export default NoticeList;
