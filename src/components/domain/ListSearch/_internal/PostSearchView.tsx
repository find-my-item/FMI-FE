import { Suspense } from "react";
import { PostListItem } from "@/components/domain";
import { EmptyState, LoadingState } from "@/components/state";
import { PostItem } from "@/api/fetch/post";
import { ErrorBoundary } from "@/app/ErrorBoundary";

const PostSearchView = ({ data }: { data: PostItem[] }) => {
  return (
    <ErrorBoundary showToast toastMessage="목록을 불러올 수 없어요. 다시 시도해 주세요.">
      <Suspense fallback={<LoadingState />}>
        <section>
          {data?.length === 0 ? (
            <EmptyState
              icon={{
                iconName: "EmptyPostList",
                iconSize: 200,
              }}
              description={"아직 게시글이 없어요.\n가장 먼저 작성해보세요!"}
            />
          ) : (
            <ul>
              {data?.map((item) => (
                <PostListItem post={item} key={item.id} />
              ))}
            </ul>
          )}
        </section>
      </Suspense>
    </ErrorBoundary>
  );
};

export default PostSearchView;
