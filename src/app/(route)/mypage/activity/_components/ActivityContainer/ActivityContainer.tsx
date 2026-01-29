import Icon, { IconName } from "@/components/common/Icon/Icon";
import { cn, formatDate } from "@/utils";
import { ACTIVITY_STYLE_CONFIG } from "../../_constants/ACTIVITY_STYLE_CONFIG";
import { ActivityGroupType, ActivityItemType } from "../../_types/ActivityType";

interface ActivityItemProps {
  activityItem: ActivityItemType;
}

function ActivityItem({ activityItem }: ActivityItemProps) {
  const { type, createdAt, title, subText } = activityItem;

  const { bgColor, iconName } = ACTIVITY_STYLE_CONFIG[type];

  return (
    <li className="flex gap-[10px]">
      <div className="flex-col-center">
        {/* 아이콘 영역 */}
        <div className={cn("h-9 w-9 rounded-full flex-center", bgColor)}>
          <Icon name={iconName as IconName} size={18} />
        </div>
        {/* 구분선 영역 */}
        <hr className="h-[54px] border border-divider-default" />
      </div>

      <div className="w-full px-5">
        <span className="text-body2-regular text-layout-body-default">{createdAt}</span>
        <p className="mt-[6px] text-body1-semibold text-neutral-strong-default">{title}</p>
        <span className="mt-[2px] text-body2-regular text-neutral-normal-default">{subText}</span>
      </div>
    </li>
  );
}

interface ActivityContainerProps {
  activityGroup: readonly ActivityGroupType[];
}

const ActivityContainer = ({ activityGroup }: ActivityContainerProps) => {
  return (
    <section className="w-full">
      <h2 className="sr-only">내 활동 내역 영역</h2>

      <div className="flex w-full flex-col gap-7 px-5 py-5">
        <ol className="flex flex-col gap-5">
          {activityGroup.map((item) => (
            <li key={item.groupId} className="flex flex-col gap-7">
              <h3 className="text-h3-semibold text-layout-header-default">{item.groupDate}</h3>

              <ul className="flex flex-col gap-9">
                {item.activityItem.map((item) => (
                  <ActivityItem key={item.activityId} activityItem={item} />
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ActivityContainer;
