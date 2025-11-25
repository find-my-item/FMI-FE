"use client";

import { Filter } from "@/components";
import { useState } from "react";
import { ALERT_CATEGORIES } from "../../_constants/ALERT_CATEGORIES";

type AlertCategoryKey = (typeof ALERT_CATEGORIES)[number]["key"];

const AlertCategory = () => {
  const [selected, setSelected] = useState<AlertCategoryKey>("all");

  return (
    <div className="mx-auto flex gap-[8px] py-[14px]">
      {ALERT_CATEGORIES.map((category) => (
        <Filter
          key={category.key}
          ariaLabel={category.label}
          onSelected={selected === category.key}
          onClick={() => setSelected(category.key)}
        >
          {category.label}
        </Filter>
      ))}
    </div>
  );
};

export default AlertCategory;
