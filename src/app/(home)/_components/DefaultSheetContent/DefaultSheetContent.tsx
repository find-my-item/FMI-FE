"use client";

import type { DefaultSheetContentHeights } from "../BottomSheet/_internal";
import {
  LostFindActions,
  PoliceSection,
  RecentFoundItemSection,
  SupportLinkSection,
  useSectionHeights,
} from "./_internal";

interface DefaultSheetContentProps {
  onSectionHeights?: (heights: DefaultSheetContentHeights) => void;
}

const DefaultSheetContent = ({ onSectionHeights }: DefaultSheetContentProps) => {
  const refs = useSectionHeights(onSectionHeights);

  return (
    <div className="space-y-5">
      <div ref={refs.lostFindRef}>
        <LostFindActions />
      </div>

      <div ref={refs.recentRef}>
        <RecentFoundItemSection />
        <hr className="my-5 w-full border-[0.7px] border-divider-default" />
      </div>

      <div ref={refs.policeRef}>
        <PoliceSection />
      </div>

      <hr className="w-full border-collapse border-[0.7px] border-divider-default" />
      <SupportLinkSection />
    </div>
  );
};

export default DefaultSheetContent;
