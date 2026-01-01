import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import { Icon } from "@/components";

type LocationDataType = {
  lat: number;
  lng: number;
  address: string;
  radius: number;
};

interface DetailKakaoMapProps {
  data: LocationDataType;
}

const DetailKakaoMap = ({ data }: DetailKakaoMapProps) => {
  const { lat, lng, address, radius } = data;

  return (
    <>
      <Map center={{ lat, lng }} style={{ width: "100%", height: "100%" }} level={6}>
        <MapMarker
          position={{ lat, lng }}
          image={{
            src: "/kakao-map/marker.svg",
            size: { width: 26, height: 30 },
            options: { offset: { x: 13, y: 15 } },
          }}
        />

        <Circle
          center={{ lat, lng }}
          radius={radius}
          strokeWeight={1}
          strokeColor="#1EB87B"
          strokeOpacity={0.8}
          fillColor="#1EB87B"
          fillOpacity={0.15}
        />
      </Map>

      <div className="absolute bottom-9 left-1/2 z-10 flex w-[90%] -translate-x-1/2 gap-2 rounded-lg bg-white px-5 py-4 shadow-lg">
        <Icon name="Position" />
        <span className="text-h3-semibold text-flatGray-700">{address}</span>
      </div>
    </>
  );
};

export default DetailKakaoMap;
