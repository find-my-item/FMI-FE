import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import DateRangeBottomSheet from "@/components/domain/DateRangeSheet/DateRangeSheet";
import { ACTIVITY_OPTIONS } from "../../_constants/ACTIVITY_OPTIONS";
import { SelectBottomSheet } from "../../../_internal";

interface ActivityBottomSheetProps {
  mode: "Date" | "Type";
  isOpen: boolean;
  onClose: () => void;
}

const ActivityBottomSheet = ({ mode, isOpen, onClose }: ActivityBottomSheetProps) => {
  if (mode === "Date") {
    return <DateRangeBottomSheet isOpen={isOpen} onClose={onClose} />;
  }

  if (mode === "Type") {
    return (
      <SelectBottomSheet isOpen={isOpen} onClose={onClose} title="필터" option={ACTIVITY_OPTIONS} />
    );
  }
};

export default ActivityBottomSheet;
