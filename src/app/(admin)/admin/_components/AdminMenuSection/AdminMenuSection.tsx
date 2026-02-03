import Link from "next/link";
import { Icon } from "@/components/common";

const AdminMenuSection = () => {
  return (
    <nav aria-label="관리자 메뉴" className="flex flex-col gap-[6px]">
      <AdminSectionNavItem
        label="공지사항"
        items={[{ href: "/admin/notice", title: "공지사항" }]}
      />

      <hr className="mx-5" />

      <AdminSectionNavItem
        label="신고/문의"
        items={[
          { href: "/admin/report", title: "신고/문의 내역" },
          { href: "/admin/inquiry", title: "비로그인 문의 내역" },
        ]}
      />

      <hr className="mx-5" />

      <AdminSectionNavItem
        label="유저 관리"
        items={[{ href: "/admin/reason", title: "유저 탈퇴 사유" }]}
      />

      <hr className="mx-5" />

      <AdminSectionNavItem
        label="계정 설정"
        items={[
          { href: "/admin/password", title: "비밀번호 변경" },
          { href: "/admin/logout", title: "로그아웃" },
        ]}
      />
    </nav>
  );
};

export default AdminMenuSection;

interface AdminSectionNavItem {
  href: string;
  title: string;
}

interface AdminSectionNavProps {
  label: string;
  items: AdminSectionNavItem[];
}

const AdminSectionNavItem = ({ label, items }: AdminSectionNavProps) => {
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
