"use client";

import { Filter, KebabMenu } from "@/components/common";
import {
  RequestStatusFilterState,
  RequestStatusFilterValue,
} from "@/components/domain/MypageRequest/_types/MypageRequestFilterType";
import { useFilterParams, useFilterSync } from "@/hooks/domain";
import { filterSelectionState, normalizedFilterValues, normalizeEnumValue } from "@/utils";
import { useState } from "react";

export const MYPAGE_REPORTS_KEBAB_OPTIONS = [
  { label: "전체", value: "ALL" },
  { label: "접수", value: "PENDING" },
  { label: "검토 중", value: "REVIEWED" },
  { label: "처리 완료", value: "RESOLVED" },
];

const MypageReportsFilter = () => {
  const [isKebabMenu, setIsKebabMenu] = useState(false);

  const { requestStatus } = useFilterParams();

  const kebabMenuItems = MYPAGE_REPORTS_KEBAB_OPTIONS.map((item) => ({
    text: item.label,
    onClick: () => {
      updateFilters({ requestStatus: item.value });
      setIsKebabMenu((prev) => !prev);
    },
  }));

  const { normalizedRequestStatus } = normalizedFilterValues({ requestStatus });
  const selectionState = filterSelectionState({ requestStatus });

  const { updateFilters } = useFilterSync<RequestStatusFilterState>({
    defaultFilters: { requestStatus: undefined },
    currentFiltersFromUrl: {
      requestStatus: normalizeEnumValue<Exclude<RequestStatusFilterValue, undefined>>(status),
    },
  });

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>

      <div className="relative">
        <Filter
          ariaLabel="임시"
          onSelected={selectionState.isRequestStatusSelected}
          // TODO(수현): 아이콘 색 변경 필요함
          icon={{ name: "ArrowDown", size: 12 }}
          iconPosition="trailing"
          onClick={() => setIsKebabMenu((prev) => !prev)}
        >
          {(normalizedRequestStatus && MYPAGE_REPORTS_KEBAB_OPTIONS[normalizedRequestStatus]) ??
            "전체"}
        </Filter>

        {isKebabMenu && (
          <div className="absolute left-0 top-full mt-2">
            <KebabMenu items={kebabMenuItems} />
          </div>
        )}
      </div>
    </section>
  );
};

export default MypageReportsFilter;
