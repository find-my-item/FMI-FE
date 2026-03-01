import { Suspense } from "react";
import { AdminListItem } from "../../../_components";
import { useGetNotices } from "@/api/fetch/notice";
import { LoadingState } from "@/components/state";
import { NoticeSortType } from "@/types/NoticeType";

interface NoticeListProps {
  keyword?: string;
  sortType?: NoticeSortType;
}

const NoticeList = ({ keyword, sortType }: NoticeListProps) => {
  const { data } = useGetNotices({ keyword, sortType });

  return (
    <Suspense fallback={<LoadingState />}>
      <section aria-label="공지사항 목록">
        <ul>
          {data?.map((item, index) => (
            <AdminListItem
              key={index}
              data={item}
              imageAlt="공지사항 이미지"
              link={`/notice/${item.noticeId}`}
            />
          ))}
        </ul>
      </section>
    </Suspense>
  );
};

export default NoticeList;
