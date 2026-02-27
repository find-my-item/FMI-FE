"use client";

import NoticeList from "../NoticeList/NoticeList";
import { AdminFilter, AdminSearch } from "../../../_components";
import { AdminFilterItemType } from "../../../_types";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { useRouter, useSearchParams } from "next/navigation";

// TODO(지권): 공지사항 무한 스크롤 cursor 기반 변경 후 작업 예정
// TODO(지권): 필터 기능 추가
const filters: AdminFilterItemType[] = [
  {
    label: "최신순",
    onSelected: false,
    onClick: () => {},
  },
];

const NoticeView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? undefined;

  const handleSearch = (keyword: string) => {
    router.replace(`/admin/notice?keyword=${keyword}`);
  };

  return (
    <div className="h-base">
      <AdminSearch onEnter={handleSearch} />

      <AdminFilter filters={filters} />

      <ErrorBoundary toastMessage="공지사항 목록을 불러올 수 없어요">
        <NoticeList keyword={keyword} />
      </ErrorBoundary>
    </div>
  );
};

export default NoticeView;
