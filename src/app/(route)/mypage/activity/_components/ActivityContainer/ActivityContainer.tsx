import Icon from "@/components/common/Icon/Icon";
import { cn } from "@/utils";
import { ACTIVITY_STYLE_CONFIG } from "../../_constants/ACTIVITY_STYLE_CONFIG";
import { ActivityDataType } from "../../_types/ActivityType";
import transformActivityArray from "../../_utils/transformActivityArray";
import { MypageEmptyUI } from "@/components/domain";
import formatHHMM from "../../_utils/formatHHMM";

interface ActivityItemProps {
  activityItem: ActivityDataType;
}

function ActivityItem({ activityItem }: ActivityItemProps) {
  const { type, createdAt, title, subText } = activityItem;

  const { bgColor, iconName } = ACTIVITY_STYLE_CONFIG[type];

  return (
    <li className="flex gap-[10px]">
      <div className="shrink-0 flex-col-center">
        <div className={cn("h-9 w-9 rounded-full flex-center", bgColor)}>
          <Icon name={iconName} size={18} />
        </div>
        <hr className="h-[54px] border border-divider-default" aria-hidden={true} />
      </div>

      <div className="min-w-0 flex-1 px-5">
        <time className="text-body2-regular text-layout-body-default">{formatHHMM(createdAt)}</time>
        <p className="mt-[6px] text-body1-semibold text-neutral-strong-default">{title}</p>
        <p className="mt-[2px] truncate text-body2-regular text-neutral-normal-default">
          {subText}
        </p>
      </div>
    </li>
  );
}

interface ActivityGroupItemProps {
  groupDate: string;
  activityItem: readonly ActivityDataType[];
}

const ActivityGroupItem = ({ groupDate, activityItem }: ActivityGroupItemProps) => {
  return (
    <li className="flex flex-col gap-7">
      <h3 className="text-h3-semibold text-layout-header-default">{groupDate}</h3>

      <ol className="flex flex-col gap-9">
        {activityItem.map((item) => (
          <ActivityItem key={item.activityId} activityItem={item} />
        ))}
      </ol>
    </li>
  );
};

interface ActivityContainerProps {
  activityData: readonly ActivityDataType[];
}

const ActivityContainer = ({ activityData }: ActivityContainerProps) => {
  const newActivityArray = transformActivityArray(activityData);

  return (
    <section>
      <h2 className="sr-only">내 활동 내역 영역</h2>

      {activityData.length === 0 ? (
        <MypageEmptyUI pageType="activity" />
      ) : (
        <div className="flex flex-col gap-7 p-5">
          <ol className="flex flex-col gap-5">
            {newActivityArray.map((item) => (
              <ActivityGroupItem
                key={item.groupId}
                groupDate={item.groupDate}
                activityItem={item.activityItem}
              />
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default ActivityContainer;
