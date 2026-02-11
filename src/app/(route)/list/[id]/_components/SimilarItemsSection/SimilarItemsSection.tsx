import { SimilarItem } from "../_internal";

const SimilarItemsSection = () => {
  return (
    <section className="flex flex-col gap-4 py-[18px] pl-5">
      <h2 className="text-h2-medium text-flatGray-900">비슷한 분실물</h2>

      <ul
        tabIndex={0}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
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
