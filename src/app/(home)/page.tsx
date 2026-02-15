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
    <>
      <LostFindActions />
      <RecentFoundItems />
      <PoliceSection />
      <div className="w-full border-collapse border-[0.7px] border-divider-default" />
      <SupportMenu />
    </>
  );
};

const PostBottomSheetContent = () => {
  return (
    <>
      <HomeFilterSection />
      <PostListItem post={MOCK_POST_ITEM} />
    </>
  );
};

const Page = () => {
  return (
    <div className="h-[calc(100dvh-4px)]">
      <BaseKakaoMap center={{ lat: 37.5665, lng: 126.978 }} showMarker={false} />
      <BottomSheet>
        <PostBottomSheetContent />
      </BottomSheet>
    </div>
  );
};

export default Page;
