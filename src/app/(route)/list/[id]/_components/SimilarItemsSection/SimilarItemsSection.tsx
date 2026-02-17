import { Suspense } from "react";
import { SimilarDataItem } from "@/api/fetch/post";
import { SimilarItemsList, SimilarSkeletonSection } from "../_internal";

interface SimilarItemsSectionProps {
  similarData: SimilarDataItem[];
}

const SimilarItemsSection = ({ similarData }: SimilarItemsSectionProps) => {
  return (
    <section className="flex flex-col gap-4 py-[18px] pl-5">
      <h2 className="text-h2-medium text-flatGray-900">비슷한 분실물</h2>

      <Suspense fallback={<SimilarSkeletonSection />}>
        <SimilarItemsList data={similarData} />
      </Suspense>
    </section>
  );
};

export default SimilarItemsSection;
