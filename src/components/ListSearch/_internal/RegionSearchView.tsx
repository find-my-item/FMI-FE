"use client";

import { Button } from "@/components";
import { useRouter, usePathname } from "next/navigation";
import { MOCK_REGIONS } from "../MOCK_REGIONS";

const RegionSearchView = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRegionRoute = (value: string) => {
    router.replace(`${pathname}?region=${value}`);
  };

  return (
    <section>
      {MOCK_REGIONS.map((i) => (
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
