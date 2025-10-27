import SimilarItem from "../SimilarItem/SimilarItem";

const SimilarItemsSection = () => {
  return (
    <section className="flex flex-col gap-[16px] py-[18px] pl-[20px]">
      <h2 className="text-[20px] font-semibold leading-[140%] tracking-[-0.01em] text-[#242424]">
        비슷한 분실물
      </h2>

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
