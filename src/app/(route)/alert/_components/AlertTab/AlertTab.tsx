"use client";

import { Tab } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { ALERT_TABS } from "../../_constants/ALERT_TABS";
import { AlertTabKey } from "../../_types/alertKeyType";

const AlertTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTab = (searchParams.get("tab") as AlertTabKey) || "all";

  const onChangeTab = (key: AlertTabKey) => router.push(`/alert?tab=${key}`);

  return <Tab tabs={ALERT_TABS} selected={selectedTab} onValueChange={onChangeTab} />;
};

export default AlertTab;
