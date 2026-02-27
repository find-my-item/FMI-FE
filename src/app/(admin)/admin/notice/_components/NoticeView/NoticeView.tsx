"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { normalizeEnumValue } from "@/utils";
import { NoticeSortType } from "@/types";
import NoticeList from "../NoticeList/NoticeList";
import { AdminFilter, AdminSearch } from "../../../_components";
import { AdminFilterItemType } from "../../../_types";
import { useClickOutside } from "@/hooks";

// TODO(지권): 공지사항 무한 스크롤 cursor 기반 변경 후 작업 예정
const getSortLabel = (sortValue: NoticeSortType) => {
  switch (sortValue) {
    case "LATEST":
      return "최신순";
    case "OLDEST":
      return "오래된순";
    case "MOST_VIEWED":
      return "조회순";
    default:
      return "최신순";
  }
};

const NoticeView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? undefined;
  const sortParam = normalizeEnumValue<NoticeSortType>(searchParams.get("sort"));
  const sort = sortParam ?? "LATEST";
  const containerRef = useClickOutside(() => setIsOpen(false));

  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (newSort: string) => {
    if (searchParams.get("sort") === newSort.toLowerCase()) {
      setIsOpen(false);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort.toLowerCase());
    router.replace(`/admin/notice?${params.toString()}`);
    setIsOpen(false);
  };

  const handleNoticeSearch = (newKeyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newKeyword === params.get("keyword")) return;

    if (!newKeyword) {
      params.delete("keyword");
    } else {
      params.set("keyword", newKeyword);
    }

    router.replace(`/admin/notice?${params.toString()}`);
  };

  const filters: AdminFilterItemType[] = [
    {
      label: getSortLabel(sort),
      onSelected: false,
      onClick: () => setIsOpen((prev) => !prev),
      icon: {
        name: isOpen ? "ArrowUp" : "ArrowDown",
        size: 16,
      },
      iconPosition: "trailing",
    },
  ];

  return (
    <div className="relative flex flex-col h-base">
      <AdminSearch onEnter={handleNoticeSearch} />

      <AdminFilter filters={filters} />

      {isOpen && (
        <div
          ref={containerRef}
          className="absolute left-5 top-[120px] z-10 flex overflow-hidden rounded-[20px] border border-gray-200 bg-white py-1 text-center shadow-lg flex-col-center"
        >
          <button
            className="w-full px-7 py-4 text-h3-medium text-neutral-normal-default"
            onClick={() => handleSortChange("LATEST")}
          >
            최신순
          </button>
          <hr className="h-px w-full bg-gray-200" />
          <button
            className="w-full px-7 py-4 text-h3-medium text-neutral-normal-default"
            onClick={() => handleSortChange("OLDEST")}
          >
            오래된순
          </button>
          <hr className="h-px w-full bg-gray-200" />
          <button
            className="w-full px-7 py-4 text-h3-medium text-neutral-normal-default"
            onClick={() => handleSortChange("MOST_VIEWED")}
          >
            조회순
          </button>
        </div>
      )}

      <ErrorBoundary toastMessage="공지사항 목록을 불러올 수 없어요">
        <NoticeList keyword={keyword} sortType={sort} />
      </ErrorBoundary>
    </div>
  );
};

export default NoticeView;
