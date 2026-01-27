"use client";

import { PostListItem } from "@/components/domain";
import { UserProfileTabKey } from "../../_types/USER_TABS";
import { CommentItem } from "../_internal";
import { UserProfileIdDataType } from "@/api/fetch/user";

interface UserProfileQueryState {
  isLoading: boolean;
  data?: UserProfileIdDataType;
}

interface TabContentsProps {
  selectedTab: UserProfileTabKey;
  query: UserProfileQueryState;
}

const EMPTY_LABEL_MAP: Record<UserProfileTabKey, string> = {
  post: "작성한 게시글",
  comment: "작성한 댓글",
  favorite: "즐겨찾기한 게시글",
};

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
    return (
      <section aria-label="탭 콘텐츠">
        <ContentEmptyUI label={EMPTY_LABEL_MAP[selectedTab]} />
      </section>
    );
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

// TODO(지권): 임시 Empty UI 컴포넌트

interface ContentEmptyUIProps {
  label: string;
}

const ContentEmptyUI = ({ label }: ContentEmptyUIProps) => {
  return (
    <li className="flex-center">
      <span>{label}</span>
      <p>데이터가 없습니다.</p>
    </li>
  );
};
