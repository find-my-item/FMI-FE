"use client";

import { Tab } from "@/components";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ALERT_TABS } from "../../_constants/ALERT_TABS";

type AlertTabKey = (typeof ALERT_TABS)[number]["key"];

const AlertTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selected = (searchParams.get("tab") as AlertTabKey) || "all";

  const onChangeTab = (key: AlertTabKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return <Tab tabs={ALERT_TABS} selected={selected} onValueChange={onChangeTab} />;
};

export default AlertTab;
