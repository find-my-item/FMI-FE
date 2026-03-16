"use client";

import Icon from "@/components/common/Icon/Icon";
import { cn } from "@/utils";
import { ACTIVITY_STYLE_CONFIG } from "../../_constants/ACTIVITY_STYLE_CONFIG";
import { MypageEmptyUI } from "@/components/domain";
import formatHHMM from "../../_utils/formatHHMM";
import { ActivityEachItemType, ActivityGroupItemType, useGetUserActivity } from "@/api/fetch/user";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";
import { useFilterParams } from "@/hooks/domain";
import { useInfiniteScroll } from "@/hooks";

interface ActivityItemProps {
  activityItem: ActivityEachItemType;
}

const ActivityItem = ({ activityItem }: ActivityItemProps) => {
  const { type, createdAt, title, content } = activityItem;

  const { bgColor, iconName } = ACTIVITY_STYLE_CONFIG[type];

  return (
    <li className="group flex gap-[10px]">
      {/* 아이콘 영역 */}
      <div className="relative flex flex-col items-center">
        <div className={cn("size-9 rounded-full flex-center", bgColor)}>
          <Icon name={iconName} size={18} />
        </div>
        <hr
          className="h-[76px] w-[1px] border border-divider-default group-last:hidden"
          aria-hidden={true}
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="min-w-0 flex-1 px-5 pb-9">
        <time className="text-body2-regular text-layout-body-default">{formatHHMM(createdAt)}</time>
        <p className="mt-[6px] text-body1-semibold text-neutral-strong-default">{title}</p>
        <p className="mt-[2px] truncate text-body2-regular text-neutral-normal-default">
          {content}
        </p>
      </div>
    </li>
  );
};

interface ActivityGroupItemProps {
  activityItem: ActivityGroupItemType;
}

const ActivityGroupItem = ({ activityItem }: ActivityGroupItemProps) => {
  const { date, activities } = activityItem;

  return (
    <li className="flex flex-col gap-7 p-5">
      <h3 className="text-h3-semibold text-layout-header-default">{date}</h3>

      <ol className="flex flex-col">
        {activities.map((item) => (
          <ActivityItem key={item.id} activityItem={item} />
        ))}
      </ol>
    </li>
  );
};

const ActivityContent = () => {
  const { startDate, endDate, activity } = useFilterParams();
  const {
    data: activityData,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetUserActivity({
    type: activity,
    startDate,
    endDate,
  });

  const { addToast } = useToast();

  const { ref } = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  if (isLoading) return <LoadingState />;
  if (isError) addToast("목록을 불러오는데 실패했어요", "error");

  return (
    <section>
      <h2 className="sr-only">내 활동 내역 영역</h2>

      {activityData && activityData.length === 0 ? (
        <MypageEmptyUI pageType="activity" />
      ) : (
        <>
          <ol className="flex flex-col">
            {activityData &&
              activityData.map((item, index) => (
                <ActivityGroupItem key={index} activityItem={item} />
              ))}
          </ol>

          <div ref={ref} className="h-10" />
        </>
      )}
    </section>
  );
};

export default ActivityContent;
