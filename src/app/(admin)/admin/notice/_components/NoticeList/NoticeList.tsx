import { Suspense } from "react";
import { AdminListItem } from "../../../_components";
import { useGetNotices } from "@/api/fetch/notice";
import { LoadingState } from "@/components/state";

const NoticeList = ({ keyword }: { keyword?: string }) => {
  const { data } = useGetNotices({ keyword });

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
