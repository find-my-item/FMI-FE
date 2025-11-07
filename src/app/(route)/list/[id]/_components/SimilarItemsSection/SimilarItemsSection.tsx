import SimilarItem from "../SimilarItem/SimilarItem";

const SimilarItemsSection = () => {
  return (
    <section className="flex flex-col gap-[16px] py-[18px] pl-[20px]">
      <h2 className="text-h2-medium text-flatGray-900">비슷한 분실물</h2>

      <ul className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="snap-start">
            <SimilarItem />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SimilarItemsSection;
