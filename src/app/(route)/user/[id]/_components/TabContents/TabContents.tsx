"use client";

import { useState } from "react";
import { Tab } from "@/components/domain";
import { USER_TABS } from "../../_types/USER_TABS";
import ListItem from "@/app/(route)/list/_components/ListItem/ListItem";
import { CommentItem } from "../_internal";
import { MOCK_POST_ITEM } from "@/mock/MOCK_DATA";

type SelectedTab = (typeof USER_TABS)[number]["key"];

const TabContents = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("post");

  return (
    <>
      <nav aria-label="프로필 탭">
        <Tab tabs={USER_TABS} selected={selectedTab} onValueChange={setSelectedTab} />
      </nav>

      <section>
        {selectedTab === "post" && (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <ListItem post={MOCK_POST_ITEM} linkState="list" key={index} />
            ))}
          </div>
        )}

        {selectedTab === "comment" && (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <CommentItem comment="여기에 댓글 내용이 표기됩니다" date="2025.11.02" key={index} />
            ))}
          </div>
        )}

        {selectedTab === "favorite" && (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <ListItem post={MOCK_POST_ITEM} linkState="list" key={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default TabContents;
