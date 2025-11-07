import { Button, Icon, RequiredText } from "@/components";

const LocationSection = () => {
  return (
    // TODO(지권): 추후 Link 태그 변경
    <section
      className="flex cursor-pointer items-center justify-between border-b border-flatGray-50 px-5 py-6"
      aria-label="위치 등록"
    >
      <span className="flex items-center gap-[5px] text-body1-medium text-flatGray-400">
        <Icon name="Location" size={16} title="위치 등록" />
        위치를 등록해 주세요. <RequiredText />
      </span>
      <Button variant="inversed" ignoreBase size="small" type="button">
        <Icon name="ArrowRight" size={18} />
      </Button>
    </section>
  );
};

export default LocationSection;
