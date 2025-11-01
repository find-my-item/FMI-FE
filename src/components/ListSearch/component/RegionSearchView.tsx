const RegionSearchView = () => {
  const regions = [{ value: "서울시 광진구" }, { value: "경기 광명시" }];

  return (
    <section>
      {regions.map((i) => (
        <button
          key={i.value}
          aria-label={`지역 선택 ${i.value}`}
          className="min-h-[60px] w-full border-b border-neutral-normal-default px-[20px] py-[20px] text-left text-body2-medium text-neutral-strong-default"
        >
          {i.value}
        </button>
      ))}
    </section>
  );
};

export default RegionSearchView;
