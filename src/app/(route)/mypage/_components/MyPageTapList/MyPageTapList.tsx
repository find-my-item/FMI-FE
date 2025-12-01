import Icon from "@/components/Icon/Icon";
import { IconName } from "@/components/Icon/Icon";
import { MyPageTapType } from "../../_types/MyPageTapType";

interface MyPageTapListProps {
  tapName: MyPageTapType;
  iconName: IconName;
}

const MyPageTapList = ({ tapName, iconName }: MyPageTapListProps) => {
  return (
    <>
      <div className="flex h-[84px] w-[82px] flex-col items-center justify-center gap-2 py-4">
        <Icon name={iconName} size={24} />
        <p className="text-body2-medium text-neutral-strong-default">{tapName}</p>
      </div>
      {tapName !== "채팅목록" && <hr className="h-[46px] border border-divider-default_3" />}
    </>
  );
};

export default MyPageTapList;
