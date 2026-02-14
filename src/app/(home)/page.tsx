import { BaseKakaoMap } from "@/components/domain";
import { Footer, Header } from "@/components/layout";

const Page = () => {
  return (
    <div className="h-[100dvh] w-full">
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} level={10} showMarker={false} />
      <Header />
      <Footer />
    </div>
  );
};

export default Page;
