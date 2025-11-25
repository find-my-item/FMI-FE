"use client";

import { Tab } from "@/components";
import { useState } from "react";

const AlertTab = () => {
  const [selected, setSelected] = useState("all");
  const ALERT_TABS = [
    { key: "all", label: "전체" },
    { key: "unread", label: "읽지 않음" },
    { key: "read", label: "읽음" },
  ];
  const onChangeTab = (key: string) => {
    setSelected(key);
  };

  return <Tab tabs={ALERT_TABS} selected={selected} onValueChange={onChangeTab} />;
};

export default AlertTab;
