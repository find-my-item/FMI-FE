"use client";

import { PostListItem } from "@/components/domain";
import { UserProfileTabKey } from "../../_types/USER_TABS";
import { CommentItem } from "../_internal";
import { UserProfileIdDataType } from "@/api/fetch/user";
import EmptyUI from "../_internal/EmptyUI/EmptyUI";

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
    selectedTab === "post"
      ? data.posts
      : selectedTab === "comment"
        ? data.comments
        : data.favorites;

  if (list.length === 0) {
    return <EmptyUI selectedTab={selectedTab} />;
  }

  return (
    <section aria-label="탭 콘텐츠">
      <ul>
        {selectedTab === "post" && (
          <>
            {data?.posts.map((post) => (
              <PostListItem post={post} linkState="list" key={post.postId} />
            ))}
          </>
        )}

        {selectedTab === "comment" && (
          <>
            {data?.comments.map((comment) => (
              <CommentItem key={comment.commentId} data={comment} />
            ))}
          </>
        )}

        {selectedTab === "favorite" && (
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
