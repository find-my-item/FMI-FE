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

const MEASURED_SECTIONS = [
  { key: "lostFind", refKey: "lostFindRef" as const, Content: LostFindActions },
  { key: "recent", refKey: "recentRef" as const, Content: RecentFoundItemSection },
  { key: "police", refKey: "policeRef" as const, Content: PoliceSection },
] as const;

const DefaultSheetContent = ({ onSectionHeights }: DefaultSheetContentProps) => {
  const refs = useSectionHeights(onSectionHeights);

  return (
    <div className="space-y-5">
      {MEASURED_SECTIONS.map(({ key, refKey, Content }) => (
        <div key={key} ref={refs[refKey]}>
          <Content />
        </div>
      ))}
      <hr className="w-full border-collapse border-[0.7px] border-divider-default" />
      <SupportLinkSection />
    </div>
  );
};

export default DefaultSheetContent;
