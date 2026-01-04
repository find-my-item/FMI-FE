"use client";

import { MOCK_POST_ITEM } from "@/mock/MOCK_DATA";
import ListItem from "@/app/(route)/list/_components/ListItem/ListItem";
import { USER_TABS } from "../../_types/USER_TABS";
import { CommentItem } from "../_internal";

interface TabContentsProps {
  selectedTab: (typeof USER_TABS)[number]["key"];
}

const TabContents = ({ selectedTab }: TabContentsProps) => {
  return (
    <section aria-label="탭 콘텐츠">
      <ul>
        {selectedTab === "post" && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <ListItem post={MOCK_POST_ITEM} linkState="list" />
              </li>
            ))}
          </>
        )}

        {selectedTab === "comment" && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <CommentItem
                data={{
                  postId: 1,
                  likes: 5,
                  comment: "여기에 댓글 내용이 표기됩니다",
                  date: "2025.11.02",
                }}
                key={index}
              />
            ))}
          </>
        )}

        {selectedTab === "favorite" && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <ListItem post={MOCK_POST_ITEM} linkState="list" />
              </li>
            ))}
          </>
        )}
      </ul>
    </section>
  );
};

export default TabContents;
