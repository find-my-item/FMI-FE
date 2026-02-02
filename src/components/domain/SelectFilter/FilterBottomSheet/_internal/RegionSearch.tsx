// 지역 검색 컴포넌트

import { Icon } from "@/components/common";

const RegionSearch = () => {
  return (
    <div className="relative w-full">
      {/* <Icon
        name="Search"
        size={16}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        className="w-full rounded-full px-5 py-[10px] pl-10 bg-fill-neutral-subtle-default"
        placeholder="검색어를 입력하세요"
        value={filters.region}
        onChange={(e) => setFilters((prev) => ({ ...prev, region: e.target.value }))}
      />
      <button
        type="button"
        onClick={() => setFilters((prev) => ({ ...prev, region: "" }))}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        aria-label="지역 검색어 지우기"
      >
        <Icon name="Delete" size={16} className="text-gray-400" />
      </button> */}
    </div>
  );
};

export default RegionSearch;
