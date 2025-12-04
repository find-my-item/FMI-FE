"use client";

import { useState } from "react";
import { Tab } from "@/components";
import { ManualItem } from "./_components";
import { MANUAL_DATA, MANUAL_LIST } from "./_constants/MANUAL_CONSTANT";
import { ManualItemType } from "./_types/ManualType";

const page = () => {
  const [selected, setSelected] = useState<keyof typeof MANUAL_DATA>("LOST");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full flex-col-center">
      <Tab
        tabs={MANUAL_LIST}
        selected={selected}
        onValueChange={(key) => {
          setSelected(key as keyof typeof MANUAL_DATA);
          setOpenIndex(null);
        }}
      />
      {MANUAL_DATA[selected].map((item: ManualItemType, index: number) => (
        <ManualItem
          key={item.title}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default page;
