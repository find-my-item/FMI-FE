import Link from "next/link";
import { Icon } from "@/components/common";

interface AdminSectionNavItem {
  href: string;
  title: string;
}

interface AdminSectionNavProps {
  label: string;
  items: AdminSectionNavItem[];
}

const AdminSectionNav = ({ label, items }: AdminSectionNavProps) => {
  return (
    <div className="flex flex-col gap-[2px] px-5 py-6">
      <span className="text-body2-regular text-layout-body-default">{label}</span>

      {items.map(({ href, title }) => (
        <Link key={href} href={href} className="flex items-center justify-between py-[10px]">
          <span className="text-body1-semibold text-neutral-strong-default">{title}</span>
          <Icon name="ArrowRightSmall" size={24} />
        </Link>
      ))}
    </div>
  );
};

export default AdminSectionNav;
