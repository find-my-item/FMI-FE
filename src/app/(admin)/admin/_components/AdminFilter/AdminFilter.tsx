"use client";

import { Filter } from "@/components/common";
import { AdminFilterItemType } from "../../_types";
import { DEFAULT_ICON, DEFAULT_ICON_POSITION } from "./DEFAULT_FILTER_ICON";

interface AdminFilterProps {
  filters: AdminFilterItemType[];
}

const AdminFilter = ({ filters }: AdminFilterProps) => {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto px-5 py-[10px]">
      {filters.map(
        ({
          label,
          onSelected,
          icon = DEFAULT_ICON,
          iconPosition = DEFAULT_ICON_POSITION,
          onClick,
        }) => (
          <Filter
            key={label}
            ariaLabel={label}
            onSelected={onSelected}
            icon={icon}
            iconPosition={iconPosition}
            onClick={onClick}
          >
            {label}
          </Filter>
        )
      )}
    </div>
  );
};

export default AdminFilter;
