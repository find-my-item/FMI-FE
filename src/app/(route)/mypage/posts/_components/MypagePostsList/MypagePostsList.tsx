// TODO(수현): api 수정 이슈로 작업 중단

import { PostItem } from "@/api/fetch/post";
import { useGetUsersMePosts } from "@/api/fetch/user/api/useGetUsersMePosts";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { MypageEmptyUI, PostListItem } from "@/components/domain";
import { LoadingState } from "@/components/state";
import { Suspense } from "react";

const MypagePostsList = () => {
  // const { data: PostsData } = useGetUsersMePosts({});
  // const posts = PostsData?.result?.posts || [];

  const posts: PostItem[] = [];

  return (
    <section>
      <ErrorBoundary>
        <Suspense fallback={<LoadingState />}>
          <h2 className="sr-only">게시글 목록 영역</h2>
          {posts.length === 0 ? (
            <MypageEmptyUI pageType="posts" />
          ) : (
            <ul>
              {posts.map((item) => (
                <PostListItem key={item.id} post={item} />
              ))}
            </ul>
          )}
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default MypagePostsList;
