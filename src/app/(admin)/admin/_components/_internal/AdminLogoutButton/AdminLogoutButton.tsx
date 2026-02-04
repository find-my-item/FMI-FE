"use client";

const AdminLogoutButton = () => {
  const handleAdminLogout = () => {
    // TODO(지권): 관리자 로그아웃 기능 추가
  };

  return (
    <button
      type="button"
      className="flex w-full items-center justify-between py-[10px]"
      onClick={handleAdminLogout}
    >
      <span className="text-body1-semibold text-neutral-strong-default">로그아웃</span>
    </button>
  );
};
export default AdminLogoutButton;
