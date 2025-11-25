import { Icon } from "@/components";
import { cn, formatDate } from "@/utils";
import { MOCK_ALERT_ITEMS } from "../../_constants/MOCK_ALERT_ITEMS";

type AlertItem = (typeof MOCK_ALERT_ITEMS)[number];

interface AlertViewProps {
  items: AlertItem[];
}

const AlertView = ({ items }: AlertViewProps) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex min-h-[86px] w-full cursor-pointer gap-3 border-b border-divider-default p-[20px] hover:bg-fill-flatGray-25",
            item.isRead
              ? "bg-white"
              : "bg-fill-brand-subtle-default_3 hover:bg-fill-brand-subtle-default_2"
          )}
        >
          <div
            className={cn("h-[30px] w-[30px] flex-shrink-0 rounded-full flex-center", item.iconBg)}
          >
            <Icon name={item.icon} size={15} />
          </div>
          <div className="flex w-full flex-col gap-[4px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-body2-medium text-brand-subtle-default">{item.category}</span>
                <span className="text-body2-medium text-neutral-normal-default">{item.title}</span>
              </div>
              <span className="text-caption1-regular text-neutral-normal-placeholder">
                {formatDate(item.createdAt)}
              </span>
            </div>
            <span className="line-clamp-1 text-body2-regular text-neutral-strong-default">
              {item.body}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default AlertView;
