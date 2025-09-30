"use client";

import { Tab } from "@/components";
import { useState } from "react";
import ListItem from "./_components/ListItem";

const page = () => {
  const [selected, setSelected] = useState("1");

  return (
    <div>
      <Tab
        tabs={[
          { key: "1", title: "분실", content: "분실" },
          { key: "2", title: "습득", content: "습득" },
        ]}
        selected={selected}
        onValueChange={setSelected}
      />
      <div className="h-[67px] w-full bg-black"></div>
      {/* 아이템 */}
      <div className="w-full">
        <ListItem />
      </div>
    </div>
  );
};

export default page;
