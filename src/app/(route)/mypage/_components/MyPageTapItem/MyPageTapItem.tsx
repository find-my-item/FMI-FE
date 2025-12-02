import Icon from "@/components/Icon/Icon";
import { IconName } from "@/components/Icon/Icon";
import { MyPageTapType } from "../../_types/MyPageTapType";

interface MyPageTapItemProps {
  tapName: MyPageTapType;
  iconName: IconName;
}

const MyPageTapItem = ({ tapName, iconName }: MyPageTapItemProps) => {
  return (
    <>
      <div className="w-[82px] gap-2 py-4 flex-col-center">
        <Icon name={iconName} size={24} />
        <span className="text-body2-medium text-neutral-strong-default">{tapName}</span>
      </div>
      {tapName !== "채팅목록" && <hr className="h-[46px] border border-divider-default_3" />}
    </>
  );
};

export default MyPageTapItem;
