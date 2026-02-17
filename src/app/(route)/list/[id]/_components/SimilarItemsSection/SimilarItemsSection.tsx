import { Suspense } from "react";
import { useGetSimilar } from "@/api/fetch/post";
import { SimilarItem, SimilarSkeletonSection } from "../_internal";

interface SimilarItemsSectionProps {
  postId: number;
}

const SimilarItemsSection = ({ postId }: SimilarItemsSectionProps) => {
  return (
    <section className="flex flex-col gap-4 py-[18px] pl-5">
      <h2 className="text-h2-medium text-flatGray-900">비슷한 분실물</h2>

      <Suspense fallback={<SimilarSkeletonSection />}>
        <SimilarItemsList postId={postId} />
      </Suspense>
    </section>
  );
};

export default SimilarItemsSection;

const SimilarItemsList = ({ postId }: { postId: number }) => {
  const { data } = useGetSimilar({ postId });
  const list = data?.result;

  if (!list || list.length === 0) return null;

  return (
    <ul
      tabIndex={0}
      className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
    >
      {list.map((post) => (
        <SimilarItem key={post.postId} data={post} />
      ))}
    </ul>
  );
};
