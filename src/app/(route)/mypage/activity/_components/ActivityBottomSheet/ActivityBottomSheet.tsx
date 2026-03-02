import { ACTIVITY_OPTIONS } from "../../_constants/ACTIVITY_OPTIONS";
import { BottomSheetModeType, SelectBottomSheet } from "../../../_internal";
import { DateRangeBottomSheet } from "@/components/domain";
import { Dispatch, SetStateAction } from "react";

interface ActivityBottomSheetProps {
  mode: BottomSheetModeType | null;
  isOpen: boolean;
  onClose: () => void;
  filters: ActivityStateType;
  setFilter: Dispatch<SetStateAction<ActivityStateType>>;
}

const ActivityBottomSheet = ({
  mode,
  isOpen,
  onClose,
  filter,
  setFilter,
}: ActivityBottomSheetProps) => {
  if (mode === null) return;

  if (mode === "Date") {
    return (
      <DateRangeBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        filters={filter}
        setFilters={setFilter}
      />
    );
  }

  if (mode === "Filter") {
    return (
      <SelectBottomSheet isOpen={isOpen} onClose={onClose} title="필터" option={ACTIVITY_OPTIONS} />
    );
  }
};

export default ActivityBottomSheet;
