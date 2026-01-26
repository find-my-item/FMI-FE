"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { USER_TABS, type UserProfileTabKey } from "../_types/USER_TABS";

const isUserProfileTabKey = (value: string | null): value is UserProfileTabKey => {
  return USER_TABS.some((t) => t.key === value);
};

export const useUserProfileTabQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTab: UserProfileTabKey = (() => {
    const tab = searchParams.get("tab");
    return isUserProfileTabKey(tab) ? tab : "post";
  })();

  const updateTabQuery = (tab: UserProfileTabKey) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === "post") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return {
    selectedTab,
    updateTabQuery,
  };
};
