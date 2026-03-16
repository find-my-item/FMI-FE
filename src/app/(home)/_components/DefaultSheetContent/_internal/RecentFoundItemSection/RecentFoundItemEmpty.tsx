import { Icon } from "@/components/common";

const RecentFoundItemEmpty = () => {
  return (
    <div className="h-[118px] w-full gap-2 py-[14px] flex-col-center">
      {/* TODO(형준): 로고 업데이트 필요 */}
      <Icon name="EmptyPostList" size={90} />
      <p className="text-body2-medium text-layout-body-default">아직 발견된 분실물이 없어요</p>
    </div>
  );
};

export default RecentFoundItemEmpty;
