import { Icon } from "@/components";
import { IconName } from "@/components/common/Icon/Icon";
import { MyPageTapType } from "../../_types/MyPageTapType";
import { TAP_CONFIG } from "../../_constants/TAP_CONFIG";

interface MyPageTapItemProps {
  tapName: MyPageTapType;
  iconName: IconName;
}

const MyPageIconNavItem = ({ tapName, iconName }: MyPageTapItemProps) => {
  return (
    <>
      <div className="gap-2 px-4 py-4 flex-col-center">
        <Icon name={iconName} size={24} />
        <span className="whitespace-nowrap text-body2-medium text-neutral-strong-default">
          {tapName}
        </span>
      </div>
      {tapName !== "채팅목록" && <hr className="h-[46px] border border-divider-default_3" />}
    </>
  );
};

const MyPageIconNav = () => {
  return (
    <div className="w-full gap-[26px] px-5 py-[6px] flex-center">
      {TAP_CONFIG.map((item, index) => (
        <MyPageIconNavItem key={index} tapName={item.tapName} iconName={item.iconName} />
      ))}
    </div>
  );
};
export default MyPageIconNav;
