import SimilarItem from "../SimilarItem/SimilarItem";

const SimilarItemsSection = () => {
  return (
    <section className="flex flex-col gap-[16px] px-5 py-[18px]">
      <h2 className="text-[20px] font-semibold">비슷한 분실물</h2>

      <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="snap-start">
            <SimilarItem />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarItemsSection;
