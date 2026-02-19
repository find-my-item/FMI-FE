import { Suspense } from "react";
import { PostListItem } from "@/components/domain";
import { EmptyState, LoadingState } from "@/components/state";
import { PostItem } from "@/api/fetch/post";

const PostSearchView = ({ data }: { data: PostItem[] }) => {
  return (
    <Suspense fallback={<LoadingState />}>
      <section>
        {!data || data.length === 0 ? (
          <EmptyState
            icon={{
              iconName: "EmptyPostSearch",
              iconSize: 70,
            }}
            title="검색 결과가 없습니다."
            description={"입력한 내용을 다시 한 번 확인해 주세요."}
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
  );
};

export default PostSearchView;
