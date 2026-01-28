import { PopupLayout } from "@/components/domain";
import DateRangeBottomSheet from "@/components/domain/DateRangeSheet/DateRangeSheet";

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
    return <div></div>;
  }
};

export default ActivityBottomSheet;
