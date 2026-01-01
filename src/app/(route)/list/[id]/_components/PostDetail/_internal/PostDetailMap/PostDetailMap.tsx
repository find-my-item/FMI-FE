import { Icon } from "@/components";

type MapData = {
  address: string;
  latitude: string;
  longitude: string;
};

interface PostDetailMapProps {
  data: MapData;
}

const PostDetailMap = ({ data }: PostDetailMapProps) => {
  const { address, latitude, longitude } = data;

  return (
    <>
      {/* TODO(지권): 추후 지도 컴포넌트 변경 */}
      <div className="h-[147px] rounded-md bg-black" />
      <address className="flex items-center gap-[6px] not-italic">
        <span className="flex items-center gap-[5px]">
          <Icon
            name="Position"
            size={16}
            aria-hidden="true"
            className="fill-current text-brand-subtle-default"
          />
          <p className="text-[14px] text-neutral-normal-default">{address || "위치 정보 없음"}</p>
        </span>
        <Icon name="ArrowRight" size={14} title="지도 이동" />
      </address>
    </>
  );
};

export default PostDetailMap;
