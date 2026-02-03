import Link from "next/link";
import { Button, Icon } from "@/components/common";
import { AdminSectionNav } from "./_components";

const page = () => {
  return (
    <div className="min-h-screen">
      <h1 className="sr-only">관리자 페이지</h1>

      <header className="flex items-center justify-between px-5 py-[30px]">
        <div className="flex items-center gap-6">
          <div className="h-[60px] w-[60px] rounded-full bg-fill-brand-subtle-default">
            <Icon name="Logo" size={60} />
          </div>
          <div>
            <p className="text-body1-semibold text-layout-header-default">찾아줘 관리자</p>
            <span className="text-body2-regular text-layout-body-default">admin@gmail.com</span>
          </div>
        </div>

        <Button
          as={Link}
          href="/admin/profile"
          aria-label="관리자 프로필 수정"
          variant="outlined"
          size="small"
        >
          프로필 수정
        </Button>
      </header>

      <nav aria-label="관리자 메뉴" className="flex flex-col gap-[6px]">
        <AdminSectionNav label="공지사항" items={[{ href: "/admin/notice", title: "공지사항" }]} />

        <hr className="mx-5" />

        <AdminSectionNav
          label="신고/문의"
          items={[
            { href: "/admin/report", title: "신고/문의 내역" },
            { href: "/admin/inquiry", title: "비로그인 문의 내역" },
          ]}
        />

        <hr className="mx-5" />

        <AdminSectionNav
          label="유저 관리"
          items={[{ href: "/admin/reason", title: "유저 탈퇴 사유" }]}
        />

        <hr className="mx-5" />

        <AdminSectionNav
          label="계정 설정"
          items={[
            { href: "/admin/password", title: "비밀번호 변경" },
            { href: "/admin/logout", title: "로그아웃" },
          ]}
        />
      </nav>
    </div>
  );
};

export default page;
