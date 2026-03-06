"use client";

import { useLogout } from "@/hooks";

const AdminLogoutButton = () => {
  const { handleLogout, isPending } = useLogout();

  return (
    <button
      type="button"
      className="flex w-full items-center justify-between py-[10px]"
      onClick={handleLogout}
      disabled={isPending}
    >
      <span className="text-body1-semibold text-neutral-strong-default">로그아웃</span>
    </button>
  );
};
export default AdminLogoutButton;
