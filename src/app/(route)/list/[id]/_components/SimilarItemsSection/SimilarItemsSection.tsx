import { Suspense } from "react";
import { useGetSimilar } from "@/api/fetch/post";
import { SimilarItem, SimilarItemSkeleton } from "../_internal";

interface SimilarItemsSectionProps {
  postId: number;
}

const SimilarItemsSection = ({ postId }: SimilarItemsSectionProps) => {
  const { data: similarData } = useGetSimilar({ postId });

  const list = similarData?.result;

  if (!list || list.length === 0) return null;

  return (
    <Suspense fallback={<SimilarItemSkeleton />}>
      <section className="flex flex-col gap-4 py-[18px] pl-5">
        <h2 className="text-h2-medium text-flatGray-900">비슷한 분실물</h2>

        <ul
          tabIndex={0}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
        >
          {list.map((post) => (
            <SimilarItem key={post.postId} data={post} />
          ))}
        </ul>
      </section>
    </Suspense>
  );
};

export default SimilarItemsSection;
