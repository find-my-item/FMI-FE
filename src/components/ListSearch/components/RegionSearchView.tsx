import Button from "@/components/Button/Button";

const RegionSearchView = () => {
  const regions = [{ value: "서울시 광진구" }, { value: "경기 광명시" }];

  return (
    <section>
      {regions.map((i) => (
        <Button
          key={i.value}
          ariaLabel={`지역 선택 ${i.value}`}
          variant="regionSearchList"
          ignoreBase
        >
          {i.value}
        </Button>
      ))}
    </section>
  );
};

export default RegionSearchView;
