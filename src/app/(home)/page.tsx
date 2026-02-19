import { BaseKakaoMap } from "@/components/domain";
import { BottomSheet, MainSearchHeader } from "./_components";

const Page = () => {
  return (
    <div className="h-dvh">
      <MainSearchHeader />
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker={false} />
      <BottomSheet />
    </div>
  );
};

export default Page;
