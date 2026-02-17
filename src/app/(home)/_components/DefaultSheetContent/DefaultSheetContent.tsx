import { LostFindActions, PoliceSection, RecentFoundItems, SupportMenu } from "./_internal";

const DefaultSheetContent = () => {
  return (
    <div className="space-y-5">
      <LostFindActions />
      <RecentFoundItems />
      <PoliceSection />
      <hr className="w-full border-collapse border-[0.7px] border-divider-default" />
      <SupportMenu />
    </div>
  );
};

export default DefaultSheetContent;
