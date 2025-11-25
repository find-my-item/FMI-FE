"use client";

import { Filter } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { ALERT_CATEGORIES } from "../../_constants/ALERT_CATEGORIES";
import { AlertCategoryKey } from "../../_types/alertKeyType";

const AlertCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = (searchParams.get("category") as AlertCategoryKey) || "all";

  const handleCategoryClick = (key: AlertCategoryKey) => router.push(`/alert?category=${key}`);

  return (
    <div className="mx-auto flex gap-[8px] py-[14px]">
      {ALERT_CATEGORIES.map((category) => (
        <Filter
          key={category.key}
          ariaLabel={category.label}
          onSelected={selectedCategory === category.key}
          onClick={() => handleCategoryClick(category.key)}
        >
          {category.label}
        </Filter>
      ))}
    </div>
  );
};

export default AlertCategory;
