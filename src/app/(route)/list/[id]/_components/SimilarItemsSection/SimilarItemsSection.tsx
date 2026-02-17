import { Suspense } from "react";
import { useGetSimilar } from "@/api/fetch/post";
import { SimilarItemsList, SimilarSkeletonSection } from "../_internal";

interface SimilarItemsSectionProps {
  postId: number;
}

const SimilarItemsSection = ({ postId }: SimilarItemsSectionProps) => {
  const { data: similarData } = useGetSimilar({ postId });

  return (
    <>
      <hr className="w-full border-neutral-normal-default" />
      <section className="flex flex-col gap-4 py-[18px] pl-5">
        <h2 className="text-h2-medium text-flatGray-900">비슷한 분실물</h2>

        <Suspense fallback={<SimilarSkeletonSection />}>
          <SimilarItemsList data={similarData?.result || []} />
        </Suspense>
      </section>
    </>
  );
};

export default SimilarItemsSection;
