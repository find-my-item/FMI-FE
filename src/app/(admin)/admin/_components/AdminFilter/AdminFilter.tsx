"use client";

import { Filter } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import { AdminFilterItemType } from "../../_types";

interface AdminFilterProps {
  filters: AdminFilterItemType[];
}

const DEFAULT_ICON = {
  name: "ArrowDown" as IconName,
  size: 16,
};

const DEFAULT_ICON_POSITION = "trailing" as const;

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
