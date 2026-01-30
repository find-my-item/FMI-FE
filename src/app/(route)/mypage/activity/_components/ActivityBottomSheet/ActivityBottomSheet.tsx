import { ACTIVITY_OPTIONS } from "../../_constants/ACTIVITY_OPTIONS";
import { BottomSheetModeType, DateRangeBottomSheet, SelectBottomSheet } from "../../../_internal";

interface ActivityBottomSheetProps {
  mode: BottomSheetModeType | null;
  isOpen: boolean;
  onClose: () => void;
}

const ActivityBottomSheet = ({ mode, isOpen, onClose }: ActivityBottomSheetProps) => {
  if (mode === null) return;

  if (mode === "Date") {
    return <DateRangeBottomSheet isOpen={isOpen} onClose={onClose} />;
  }

  if (mode === "Filter") {
    return (
      <SelectBottomSheet isOpen={isOpen} onClose={onClose} title="필터" option={ACTIVITY_OPTIONS} />
    );
  }
};

export default ActivityBottomSheet;
