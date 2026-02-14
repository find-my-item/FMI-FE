import { BaseKakaoMap } from "@/components/domain";

const Page = () => {
  return (
    <div className="h-[calc(100dvh-4px)]">
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker={false} />
    </div>
  );
};

export default Page;
