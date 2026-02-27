import { RefObject, Suspense } from "react";
import { PostItem } from "@/api/fetch/post";
import { PostListItem } from "@/components/domain";
import { EmptyState, LoadingState } from "@/components/state";

interface DefaultListProps {
  listData: PostItem[];
  listRef?: React.Ref<HTMLDivElement>;
  hasNextPage: boolean;
}

const DefaultList = ({ listData, listRef, hasNextPage }: DefaultListProps) => {
  return (
    <Suspense fallback={<LoadingState />}>
      <section aria-label="게시글 목록" className="w-full">
        {listData?.length === 0 ? (
          <EmptyState
            icon={{
              iconName: "EmptyPostList",
              iconSize: 200,
            }}
            description={"아직 게시글이 없어요.\n가장 먼저 작성해보세요!"}
          />
        ) : (
          <>
            <ul>
              {listData?.map((item) => (
                <PostListItem key={item.id} post={item} linkState="list" />
              ))}
            </ul>

            {hasNextPage && <div ref={listRef} className="h-10 w-full" />}
          </>
        )}
      </section>
    </Suspense>
  );
};

export default DefaultList;
