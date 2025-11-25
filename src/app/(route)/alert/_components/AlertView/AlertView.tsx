import { Icon } from "@/components";
import { cn } from "@/utils";

const AlertView = () => {
  const ALERT_ITEMS = [
    {
      id: 1,
      category: "전자기기",
      title: ` 새 게시글이 등록되었어요.`,
      body: "시청역 아이폰 14 보관중입니다.",
      createdAt: "2025.01.01",
      isRead: true,
      icon: "AlertItem" as const,
      iconBg: "bg-blue-200",
    },
    {
      id: 2,
      category: "확인하지 않은 채팅",
      title: "이 있어요.",
      body: "혹시 OO동 OO빌딩 화장실에서 핸드폰 잃어버리셨나요 그럼 혹시",
      createdAt: "2025.09.20",
      isRead: true,
      icon: "AlertUnreadChat" as const,
      iconBg: "bg-flatGreen-500",
    },
    {
      id: 3,
      category: "새로운 채팅",
      title: "이 도착했어요.",
      body: "혹시 OO동 OO빌딩 화장실에서 핸드폰 잃어버리셨나요 그럼 혹시",
      createdAt: "2025.09.20",
      isRead: true,
      icon: "AlertNewChat" as const,
      iconBg: "bg-flatGreen-500",
    },
    {
      id: 4,
      category: "즐겨찾기한 게시글의 상태",
      title: "가 변경되었어요.",
      body: "노원구에서 검정색 카드 지갑 잃어버렸어요",
      createdAt: "2025.09.20",
      isRead: true,
      icon: "AlertStar" as const,
      iconBg: "bg-system-bookmark",
    },
    {
      id: 5,
      category: "새로운 댓글",
      title: "이 달렸어요.",
      body: "서울시 노원구 OO동 건물 화장실에서 핸드폰을 잃어버렸어요. 핸드폰은",
      createdAt: "2025.09.20",
      isRead: false,
      icon: "AlertNewComment" as const,
      iconBg: "bg-flatGray-600",
    },
  ];

  return (
    <>
      {ALERT_ITEMS.map((item) => (
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
                {item.createdAt}
              </span>
            </div>
            <span className="text-body2-regular text-neutral-strong-default">{item.body}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default AlertView;
