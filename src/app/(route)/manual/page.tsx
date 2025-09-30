"use client";

import { useState } from "react";
import ManualItem from "./_components/ManualItem";
import { MANUAL, ManualItemType } from "./_constants/MANUAL";
import { Tab } from "@/components";

const manualList = [
  {
    title: "분실",
    content: "분실 매뉴얼",
    key: "LOST",
  },
  {
    title: "습득",
    content: "습득 매뉴얼",
    key: "FOUND",
  },
  {
    title: "도난",
    content: "도난 매뉴얼",
    key: "STOLEN",
  },
];

const page = () => {
  const [selected, setSelected] = useState<keyof typeof MANUAL>("LOST");

  return (
    <div className="flex-col-center w-full">
      <Tab tabs={manualList} selected={selected} onValueChange={setSelected} />
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
