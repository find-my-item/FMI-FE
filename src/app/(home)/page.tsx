import { BaseKakaoMap } from "@/components/domain";
import {
  BottomSheet,
  LostFindActions,
  PoliceSection,
  RecentFoundItems,
  SupportMenu,
} from "./_components";

const Page = () => {
  return (
    <div className="h-[calc(100dvh-4px)]">
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker={false} />
      <BottomSheet>
        <LostFindActions />
        <RecentFoundItems />
        <PoliceSection />
        <div className="w-full border-collapse border-[0.7px] border-divider-default" />
        <SupportMenu />
      </BottomSheet>
    </div>
  );
};

export default Page;
