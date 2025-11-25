"use client";

import { Tab } from "@/components";
import { useState } from "react";
import { ALERT_TABS } from "../../_constants/ALERT_TABS";

type AlertTabKey = (typeof ALERT_TABS)[number]["key"];

const AlertTab = () => {
  const [selected, setSelected] = useState<AlertTabKey>("all");
  const onChangeTab = (key: AlertTabKey) => {
    setSelected(key);
  };

  return <Tab tabs={ALERT_TABS} selected={selected} onValueChange={onChangeTab} />;
};

export default AlertTab;
