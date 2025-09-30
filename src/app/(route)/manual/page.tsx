"use client";

import { useState } from "react";
import ManualItem from "./_components/ManualItem";
import { MANUAL, ManualItemType } from "./_constants/MANUAL";
import { Tab } from "@/components";

const manualList = [
  {
    label: "분실",
    key: "LOST",
  },
  {
    label: "습득",
    key: "FOUND",
  },
  {
    label: "도난",
    key: "STOLEN",
  },
];

const page = () => {
  const [selected, setSelected] = useState<keyof typeof MANUAL>("LOST");

  return (
    <div className="flex-col-center w-full">
      <Tab
        tabs={manualList}
        selected={selected}
        onValueChange={(key) => setSelected(key as keyof typeof MANUAL)}
      />
      {MANUAL[selected].map((item: ManualItemType) => (
        <ManualItem
          key={item.title}
          title={item.title}
          content={item.content}
          href={item.href}
          btnText={item.btnText}
        />
      ))}
    </div>
  );
};

export default page;
