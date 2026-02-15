import { BaseKakaoMap, PostListItem } from "@/components/domain";
import {
  BottomSheet,
  HomeFilterSection,
  LostFindActions,
  PoliceSection,
  RecentFoundItems,
  SupportMenu,
} from "./_components";
import { MOCK_POST_ITEM } from "@/mock/data";

const DefaultBottomSheetContent = () => {
  return (
    <div className="space-y-5">
      <LostFindActions />
      <RecentFoundItems />
      <PoliceSection />
      <div className="w-full border-collapse border-[0.7px] border-divider-default" />
      <SupportMenu />
    </div>
  );
};

const PostBottomSheetContent = () => {
  return (
    <>
      <HomeFilterSection />
      <div className="-mx-5 mt-2 space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <PostListItem key={index} post={MOCK_POST_ITEM} />
        ))}
      </div>
    </>
  );
};

const Page = () => {
  return (
    <div className="h-[calc(100dvh-4px)]">
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker={false} />
      <BottomSheet>
        <DefaultBottomSheetContent />
        {/* <PostBottomSheetContent /> */}
      </BottomSheet>
    </div>
  );
};

export default Page;
