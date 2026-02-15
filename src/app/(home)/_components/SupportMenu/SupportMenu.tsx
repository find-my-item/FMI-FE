import { Icon } from "@/components/common";
import Link from "next/link";

const SUPPORT_MENU_ITEMS = [
  {
    label: "키워드 알람 설정하기",
    href: "#",
  },
  {
    label: "공지사항",
    href: "#",
  },
];

const SupportMenu = () => {
  return (
    <div className="w-full">
      {SUPPORT_MENU_ITEMS.map((item) => (
        <Link href={item.href} className="flex items-center justify-between px-1 py-2">
          <span className="text-body1-medium text-layout-header-default">{item.label}</span>
          <Icon name="ArrowRightSmall" size={20} />
        </Link>
      ))}
    </div>
  );
};

export default SupportMenu;
