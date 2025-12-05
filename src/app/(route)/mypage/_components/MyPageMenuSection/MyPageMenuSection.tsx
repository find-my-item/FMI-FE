import { Icon } from "@/components";
import { cn } from "@/utils";
import Link from "next/link";

interface MyPageMenuSectionProps {
  menu: {
    title: string;
    pages: readonly {
      pageName: string;
      pageLink: string;
    }[];
  };
}

const MyPageMenuSection = ({ menu }: MyPageMenuSectionProps) => {
  return (
    <>
      <div className="w-full px-5 py-6">
        <div className="flex h-10 items-center text-body2-regular text-layout-body-default">
          {menu.title}
        </div>
        {menu.pages.map((item) => (
          <Link
            key={item.pageName}
            href={item.pageLink}
            className="flex h-11 w-full justify-between py-[10px] text-body1-semibold text-neutral-strong-default"
          >
            {item.pageName}
            <Icon name="ArrowRightSmall" size={24} />
          </Link>
        ))}
      </div>
      <hr
        className={cn(
          "mx-5 max-w-full border border-divider-default_3",
          menu.title === "계정 설정" && "aria-hidden"
        )}
      />
    </>
  );
};

export default MyPageMenuSection;
