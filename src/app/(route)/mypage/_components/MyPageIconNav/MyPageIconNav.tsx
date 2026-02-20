import { Icon } from "@/components/common";
import { IconName } from "@/components/common/Icon/Icon";
import { MyPageTapType } from "../../_types/MyPageTapType";
import Link from "next/link";
import { MYPAGE_TAP_CONFIG } from "../../_constants/MYPAGE_ROUTE_CONFIG";

interface MyPageTapItemProps {
  pageName: MyPageTapType;
  iconName: IconName;
  pageLink: string;
}

const MyPageIconNavItem = ({ pageName, iconName, pageLink }: MyPageTapItemProps) => {
  return (
    <>
      <Link href={pageLink} className="gap-2 py-4 flex-col-center">
        <Icon name={iconName} size={24} />
        <span className="whitespace-nowrap px-[50px] text-body2-medium text-neutral-strong-default">
          {pageName}
        </span>
      </Link>
      {pageName !== "채팅목록" && <hr className="h-[46px] border border-divider-default_3" />}
    </>
  );
};

const MyPageIconNav = () => {
  return (
    <div className="w-full gap-[26px] px-5 py-[6px] flex-center">
      {MYPAGE_TAP_CONFIG.map((item, index) => (
        <MyPageIconNavItem
          key={index}
          pageName={item.pageName}
          iconName={item.iconName}
          pageLink={item.pageLink}
        />
      ))}
    </div>
  );
};
export default MyPageIconNav;
