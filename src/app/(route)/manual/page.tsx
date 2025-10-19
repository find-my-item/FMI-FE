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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full flex-col-center">
      <Tab
        tabs={manualList}
        selected={selected}
        onValueChange={(key) => {
          setSelected(key as keyof typeof MANUAL);
          setOpenIndex(null);
        }}
      />
      {MANUAL[selected].map((item: ManualItemType, index: number) => (
        <ManualItem
          key={item.title}
          {...item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default page;
