import Link from "next/link";
import { Icon, RequiredText } from "@/components/common";

const LocationSection = () => {
  return (
    <Link
      href={"/write/location"}
      className="flex cursor-pointer items-center justify-between border-b border-flatGray-50 px-5 py-6"
    >
      <span className="flex items-center gap-[5px] text-body1-medium text-flatGray-400">
        <Icon name="Location" size={16} title="위치 등록" />
        위치를 등록해 주세요. <RequiredText />
      </span>
      <Icon name="ArrowRight" size={18} />
    </Link>
  );
};

export default LocationSection;
