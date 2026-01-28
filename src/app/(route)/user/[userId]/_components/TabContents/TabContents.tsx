"use client";

import { PostListItem } from "@/components/domain";
import { UserProfileIdDataType } from "@/api/fetch/user";
import { UserProfileTabKey } from "../../_types/USER_TABS";
import { CommentItem, EmptyUI } from "../_internal";

interface UserProfileQueryState {
  isLoading: boolean;
  data?: UserProfileIdDataType;
}

interface TabContentsProps {
  selectedTab: UserProfileTabKey;
  query: UserProfileQueryState;
}

const TabContents = ({ selectedTab, query }: TabContentsProps) => {
  const { isLoading, data } = query;
  // TODO(지권): 로딩, 에러 상태 처리 필요
  if (isLoading) return "로딩 중....";

  if (!data) return null;

  const list =
    selectedTab === "posts"
      ? data.posts
      : selectedTab === "comments"
        ? data.comments
        : data.favorites;

  if (list.length === 0) {
    return <EmptyUI selectedTab={selectedTab} />;
  }

  return (
    <section aria-label="탭 콘텐츠">
      <ul>
        {selectedTab === "posts" && (
          <>
            {data?.posts.map((post) => (
              <PostListItem post={post} linkState="list" key={post.postId} />
            ))}
          </>
        )}

        {selectedTab === "comments" && (
          <>
            {data?.comments.map((comment) => (
              <CommentItem key={comment.commentId} data={comment} />
            ))}
          </>
        )}

        {selectedTab === "favorites" && (
          <>
            {data?.posts.map((post) => (
              <PostListItem post={post} linkState="list" key={post.postId} />
            ))}
          </>
        )}
      </ul>
    </section>
  );
};

export default TabContents;
