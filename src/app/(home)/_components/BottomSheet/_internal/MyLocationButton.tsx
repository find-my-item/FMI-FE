import { Icon } from "@/components/common";

const MyLocationButton = () => {
  return (
    <button
      aria-label="내 위치로 이동"
      className="absolute right-3 flex h-[38px] w-[38px] rounded-full bg-white shadow-lg flex-center"
      style={{ bottom: `calc(100% + 12px)` }}
    >
      <Icon name="MapMyLocation" size={20} />
    </button>
  );
};

export default MyLocationButton;
