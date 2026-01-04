"use client";

import { MOCK_POST_ITEM } from "@/mock/MOCK_DATA";
import ListItem from "@/app/(route)/list/_components/ListItem/ListItem";
import { USER_TABS } from "../../_types/USER_TABS";
import { CommentItem } from "../_internal";

const TabContents = ({ selectedTab }: { selectedTab: (typeof USER_TABS)[number]["key"] }) => {
  return (
    <>
      <section>
        <ul>
          {selectedTab === "post" && (
            <li>
              {Array.from({ length: 5 }).map((_, index) => (
                <ListItem post={MOCK_POST_ITEM} linkState="list" key={index} />
              ))}
            </li>
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
                <ListItem post={MOCK_POST_ITEM} linkState="list" key={index} />
              ))}
            </>
          )}
        </ul>
      </section>
    </>
  );
};

export default TabContents;
