"use client";

import { Icon } from "@/components/common";
import { cn, formatDate } from "@/utils";
import { MOCK_ALERT_ITEMS } from "../../_constants/MOCK_ALERT_ITEMS";
import { useSearchParams } from "next/navigation";
import { AlertCategoryKey } from "../../_types/alertKeyType";
import Link from "next/link";

const AlertItem = ({ item }: { item: (typeof MOCK_ALERT_ITEMS)[number] }) => {
  return (
    <Link
      href="#"
      aria-label="알림 확인, 외부 페이지 이동"
      key={item.id}
      className={cn(
        "flex min-h-[86px] w-full cursor-pointer gap-3 border-b border-divider-default p-5 transition-colors hover:bg-fill-flatGray-25",
        item.isRead
          ? "bg-white"
          : "bg-fill-brand-subtle-default_3 hover:bg-fill-brand-subtle-default_2"
      )}
    >
      <div className={cn("h-[30px] w-[30px] flex-shrink-0 rounded-full flex-center", item.iconBg)}>
        <Icon name={item.icon} size={15} />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-body2-medium">
            <span className="text-brand-normal-default">{item.category}</span>
            <span className="text-neutral-normal-default">{item.title}</span>
          </div>
          <span className="text-caption1-regular text-neutral-normal-placeholder">
            {formatDate(item.createdAt)}
          </span>
        </div>
        <span className="line-clamp-1 text-body2-regular text-neutral-strong-default">
          {item.body}
        </span>
      </div>
    </Link>
  );
};

const AlertView = () => {
  const searchParams = useSearchParams();
  const selectedCategory = (searchParams.get("category") as AlertCategoryKey) || "all";

  const filteredItems = MOCK_ALERT_ITEMS.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.categoryKey === selectedCategory;
    return categoryMatch;
  });

  return (
    <>
      {filteredItems.map((item) => (
        <AlertItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default AlertView;
