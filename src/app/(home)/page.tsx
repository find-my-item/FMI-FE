import { BaseKakaoMap } from "@/components/domain";
import { BottomSheet } from "./_components";
import { Header } from "@/components/layout";

const Page = () => {
  return (
    <div className="h-dvh">
      <Header />
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker={false} />
      <BottomSheet />
    </div>
  );
};

export default Page;
