"use client";

import { Tab } from "@/components";
import { useState } from "react";
import { USER_TABS } from "../../_types/USER_TABS";

type SelectedTab = (typeof USER_TABS)[number]["key"];

const TabContents = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("post");

  return (
    <>
      <nav aria-label="프로필 탭">
        <Tab tabs={USER_TABS} selected={selectedTab} onValueChange={setSelectedTab} />
      </nav>

      <section className="p-5">
        {selectedTab === "post" && <div>게시글</div>}
        {selectedTab === "comment" && <div>댓글</div>}
        {selectedTab === "favorite" && <div>즐겨찾기</div>}
      </section>
    </>
  );
};

export default TabContents;
