import { Icon } from "@/components";
import RequiredText from "@/components/RequiredText/RequiredText";

const LocationSection = () => {
  return (
    <section
      className="flex cursor-pointer items-center justify-between border-b border-flatGray-50 px-5 py-6"
      aria-label="위치 등록"
    >
      <span className="flex items-center gap-[5px] text-body1-medium text-flatGray-400">
        <Icon name="Location" size={16} title="위치 등록" />
        위치를 등록해 주세요. <RequiredText />
      </span>
      <button type="button" className="h-[18px] w-[18px]">
        <Icon name="ArrowRight" title="위치 열기" size={18} />
      </button>
    </section>
  );
};

export default LocationSection;
