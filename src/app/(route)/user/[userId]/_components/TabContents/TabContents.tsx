"use client";

import { PostListItem } from "@/components/domain";
import { EmptyState, LoadingState } from "@/components/state";
import { UserProfileIdDataType } from "@/api/fetch/user";
import { UserProfileTabKey } from "../../_types/USER_TABS";
import { CommentItem } from "../_internal";

interface TabContentsProps {
  selectedTab: UserProfileTabKey;
  data?: UserProfileIdDataType;
  isLoading: boolean;
}

const TabContents = ({ selectedTab, data, isLoading }: TabContentsProps) => {
  if (isLoading) return <LoadingState />;
  if (!data) return null;

  return (
    <section aria-label="탭 콘텐츠">
      <ul>
        {selectedTab === "posts" &&
          (data.posts.length === 0 ? (
            <li>
              <EmptyState
                icon={{ iconName: "NoPosts", iconSize: 70 }}
                title="아직 작성한 게시글이 없어요"
                description={"아직 작성한 게시글이 없습니다.\n지금 바로 글을 남겨보세요!"}
              />
            </li>
          ) : (
            data.posts.map((post) => (
              <PostListItem post={post} linkState="list" key={post.postId} />
            ))
          ))}

        {selectedTab === "comments" &&
          (data.comments.length === 0 ? (
            <li>
              <EmptyState
                icon={{ iconName: "NoComments", iconSize: 70 }}
                title="아직 작성한 댓글이 없어요"
                description={"아직 작성한 댓글이 없습니다.\n지금 바로 댓글을 남겨보세요!"}
              />
            </li>
          ) : (
            data.comments.map((comment) => <CommentItem key={comment.commentId} data={comment} />)
          ))}

        {selectedTab === "favorites" &&
          (data.favorites.length === 0 ? (
            <li>
              <EmptyState
                icon={{ iconName: "EmptyFavorite", iconSize: 70 }}
                title="아직 즐겨찾기한 게시글이 없어요"
                description={
                  "아직 즐겨찾기한 게시글이 없습니다.\n나중에 다시 보고 싶은 게시글을 모아보세요!"
                }
              />
            </li>
          ) : (
            data.favorites.map((post) => (
              <PostListItem post={post} linkState="list" key={post.postId} />
            ))
          ))}
      </ul>
    </section>
  );
};

export default TabContents;
