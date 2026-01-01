import { Icon } from "@/components";
import KakaoMap from "./KakaoMap";

type MapData = {
  address: string;
  latitude: number;
  longitude: number;
};

interface PostDetailMapProps {
  data: MapData;
}

const PostDetailMap = ({ data }: PostDetailMapProps) => {
  const { address, latitude, longitude } = data;

  return (
    <div className="flex flex-col gap-[18px]">
      {/* TODO(지권): 추후 지도 컴포넌트 변경 */}
      <div className="h-[147px] overflow-hidden rounded-md border border-divider-default">
        <KakaoMap latitude={latitude} longitude={longitude} />
      </div>
      <address className="flex items-center gap-[6px] not-italic">
        <span className="flex items-center gap-[5px]">
          {address && (
            <Icon
              name="Position"
              size={16}
              aria-hidden="true"
              className="fill-current text-brand-subtle-default"
            />
          )}
          <p className="text-[14px] text-neutral-normal-default">
            {address || "위치 정보가 없어요"}
          </p>
        </span>
        {address && <Icon name="ArrowRight" size={14} />}
      </address>
    </div>
  );
};

export default PostDetailMap;
