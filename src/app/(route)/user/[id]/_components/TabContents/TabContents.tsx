"use client";

import { Tab } from "@/components";
import { useState } from "react";
import { USER_TABS } from "../../_types/USER_TABS";
import ListItem from "@/app/(route)/list/_components/ListItem/ListItem";
import CommentItem from "../CommentItem/CommentItem";

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
              <ListItem
                id={1}
                linkState="list"
                img="/test_list.JPG"
                title="게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목"
                description="서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다"
                key={index}
              />
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
              <ListItem
                id={1}
                linkState="list"
                img="/test_list.JPG"
                title="게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목"
                description="서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다"
                key={index}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default TabContents;
