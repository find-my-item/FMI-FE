"use client";

import { Filter, KebabMenu } from "@/components/common";
import { useState } from "react";
import { MYPAGE_KEBAB_OPTIONS } from "../_constants/MYPAGE_KEBAB_OPTION";
import { MypageRequestType } from "../_types/MypageRequestType";
import { useFilterSync } from "@/hooks/domain/useFilterSync/useFilterSync";
import { filterSelectionState, normalizedFilterValues, normalizeEnumValue } from "@/utils";
import { useFilterParams } from "@/hooks/domain";
import {
  RequestStatusFilterState,
  RequestStatusFilterValue,
} from "../_types/MypageRequestFilterType";
import { REPORTS_LABEL_MAP } from "../_constants/REQUEST_LABEL";

interface MypageKebabFilterProps {
  status: MypageRequestType;
}

const MypageKebabFilter = ({ status }: MypageKebabFilterProps) => {
  const [isKebabMenu, setIsKebabMenu] = useState(false);

  const kebabMenuItems = MYPAGE_KEBAB_OPTIONS[status].map((item) => ({
    text: item.label,
    onClick: () => {
      updateFilters({ requestStatus: item.value });
      setIsKebabMenu((prev) => !prev);
    },
  }));

  const { requestStatus } = useFilterParams();

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
          {(normalizedRequestStatus && REPORTS_LABEL_MAP[normalizedRequestStatus]) ?? "전체"}
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

export default MypageKebabFilter;
