import Link from "next/link";
import { cn } from "@/utils";
import { useWriteStore } from "@/store";
import { Icon, RequiredText } from "@/components/common";

const LocationSection = () => {
  const { location } = useWriteStore();
  const displayText = location ?? "위치를 등록해 주세요.";

  return (
    <Link
      href={"/write/post/location"}
      className="flex cursor-pointer items-center justify-between border-b border-flatGray-50 px-5 py-6"
    >
      <span
        className={cn(
          "flex items-center gap-[5px] text-body1-medium",
          location ? "text-neutral-normal-default" : "text-flatGray-400"
        )}
      >
        <Icon name="Location" size={16} />
        <span>{displayText}</span>
        {!location && <RequiredText />}
      </span>
      <Icon name="ArrowRight" size={18} />
    </Link>
  );
};

export default LocationSection;
