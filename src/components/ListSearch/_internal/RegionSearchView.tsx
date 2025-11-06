"use client";

import Button from "@/components/Buttons/Button/Button";
import { useRouter, usePathname } from "next/navigation";

const RegionSearchView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const regions = [{ value: "서울시 광진구" }, { value: "경기 광명시" }];

  const handleRegionRoute = (value: string) => {
    router.replace(`${pathname}?region=${value}`);
  };

  return (
    <section>
      {regions.map((i) => (
        <Button
          key={i.value}
          ariaLabel={`지역 선택 ${i.value}`}
          variant="regionSearchList"
          ignoreBase
          onClick={() => handleRegionRoute(i.value)}
        >
          {i.value}
        </Button>
      ))}
    </section>
  );
};

export default RegionSearchView;
