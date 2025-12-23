"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { MOCK_REGIONS } from "../MOCK_REGIONS";

const RegionSearchView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRegionClick = (regionValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("region", regionValue);
    params.delete("search"); // 지역 선택 시 search 모드를 default로 변경
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="flex flex-col">
      {MOCK_REGIONS.map(({ value }) => (
        <button
          key={value}
          onClick={() => handleRegionClick(value)}
          className="min-h-[60px] w-full border-b border-neutral-normal-default bg-white px-[20px] py-[20px] text-left text-body2-medium text-neutral-strong-default"
        >
          {value}
        </button>
      ))}
    </section>
  );
};

export default RegionSearchView;
