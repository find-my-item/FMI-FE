"use client";

import { Filter } from "@/components";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ALERT_CATEGORIES } from "../../_constants/ALERT_CATEGORIES";

type AlertCategoryKey = (typeof ALERT_CATEGORIES)[number]["key"];

const AlertCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selected = (searchParams.get("category") as AlertCategoryKey) || "all";

  const handleCategoryClick = (key: AlertCategoryKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mx-auto flex gap-[8px] py-[14px]">
      {ALERT_CATEGORIES.map((category) => (
        <Filter
          key={category.key}
          ariaLabel={category.label}
          onSelected={selected === category.key}
          onClick={() => handleCategoryClick(category.key)}
        >
          {category.label}
        </Filter>
      ))}
    </div>
  );
};

export default AlertCategory;
