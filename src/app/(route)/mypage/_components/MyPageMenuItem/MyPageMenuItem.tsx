import { Icon } from "@/components";
import Link from "next/link";

interface MyPageMenuItem {
  pageName: string;
}

const MyPageMenuItem = ({ pageName }: MyPageMenuItem) => {
  return (
    <Link
      href={`/${pageName}`}
      className="flex h-11 w-full justify-between py-[10px] text-body1-semibold text-neutral-strong-default"
    >
      {pageName}
      <Icon name="ArrowRightSmall" size={24} />
    </Link>
  );
};

export default MyPageMenuItem;
