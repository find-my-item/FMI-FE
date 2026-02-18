"use client";

import { PostListItem } from "@/components/domain";
import { EmptyState, LoadingState } from "@/components/state";
import { UserCommentsDataType, UserProfileItem } from "@/api/fetch/user";
import { UserProfileTabKey } from "../../_types/USER_TABS";
import { CommentItem } from "../_internal";

interface TabContentsProps {
  selectedTab: UserProfileTabKey;
  data?: UserProfileItem[];
  isLoading: boolean;
}

const TabContents = ({ selectedTab, data, isLoading }: TabContentsProps) => {
  if (isLoading) return <LoadingState />;
  if (!data) return null;

  return (
    <section aria-label="탭 콘텐츠">
      <ul>
        {selectedTab === "posts" &&
          (data.length === 0 ? (
            <li>
              <EmptyState
                icon={{ iconName: "NoPosts", iconSize: 70 }}
                title="아직 작성한 게시글이 없어요"
                description={"해당 유저가 작성한 게시글이 없습니다."}
              />
            </li>
          ) : (
            data.map((post) => <PostListItem post={post} linkState="list" key={post.postId} />)
          ))}

        {selectedTab === "comments" &&
          (() => {
            const comments = data as UserCommentsDataType[];

            return comments.length === 0 ? (
              <li>
                <EmptyState
                  icon={{ iconName: "NoComments", iconSize: 70 }}
                  title="아직 작성한 댓글이 없어요"
                  description={"아직 작성한 댓글이 없습니다.\n지금 바로 댓글을 남겨보세요!"}
                />
              </li>
            ) : (
              comments.map((comment) => <CommentItem key={comment.commentId} data={comment} />)
            );
          })()}

        {selectedTab === "favorites" &&
          (data.length === 0 ? (
            <li>
              <EmptyState
                icon={{ iconName: "EmptyFavorite", iconSize: 70 }}
                title="아직 즐겨찾기한 게시글이 없어요"
                description={"해당 유저가 즐겨찾기한 게시글이 없습니다."}
              />
            </li>
          ) : (
            data.map((post) => <PostListItem post={post} linkState="list" key={post.postId} />)
          ))}
      </ul>
    </section>
  );
};

export default TabContents;
