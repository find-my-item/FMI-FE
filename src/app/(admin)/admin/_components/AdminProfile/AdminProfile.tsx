import Link from "next/link";
import { Button, Icon } from "@/components/common";

const AdminProfile = () => {
  return (
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
  );
};

export default AdminProfile;
