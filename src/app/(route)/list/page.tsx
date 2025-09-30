"use client";

import { Tab } from "@/components";
import { useState } from "react";
import ListItem from "./_components/ListItem";

const list = [
  {
    key: "LOST",
    label: "분실",
  },
  {
    key: "FOUND",
    label: "습득",
  },
];

const page = () => {
  const [selected, setSelected] = useState("LOST");

  return (
    <div>
      <Tab tabs={list} selected={selected} onValueChange={setSelected} />
      <div className="h-[67px] w-full bg-black" />
      {/* 아이템 */}
      <div className="w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <ListItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
