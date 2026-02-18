import {
  LostFindActions,
  PoliceSection,
  RecentFoundItemSection,
  SupportLinkSection,
} from "./_internal";

const DefaultSheetContent = () => {
  return (
    <div className="space-y-5">
      <LostFindActions />
      <RecentFoundItemSection />
      <PoliceSection />
      <hr className="w-full border-collapse border-[0.7px] border-divider-default" />
      <SupportLinkSection />
    </div>
  );
};

export default DefaultSheetContent;
