import { Icon } from "@/components";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type LocationDataType = {
  lat: number;
  lng: number;
  address: string;
};

interface DetailKakaoMapProps {
  data: LocationDataType;
}

const DetailKakaoMap = ({ data }: DetailKakaoMapProps) => {
  const { lat, lng, address } = data;
  return (
    <Map center={{ lat, lng }} style={{ width: "100%", height: "100%" }}>
      <MapMarker position={{ lat, lng }} />
      <div className="absolute bottom-4 left-1/2 z-10 w-[90%] -translate-x-1/2 rounded-lg bg-white p-3 shadow-lg">
        <Icon name="Position" className="mr-2 inline-block" />
        <span className="text-sm font-medium">{address}</span>
      </div>
    </Map>
  );
};

export default DetailKakaoMap;
