import { Button } from "@/components/common";
import { DateRangeSheet, PopupLayout } from "@/components/domain";
import { cn } from "@/utils";
import { FilterModeType } from "../../../posts/_types/FilterModeType";

interface MypageCommentsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MypageCommentsBottomSheet = ({ isOpen, onClose }: MypageCommentsBottomSheetProps) => {
  return (
    <PopupLayout
      isOpen={isOpen}
      onClose={onClose}
      className={cn("w-full gap-12 px-5 py-10 flex-col-center")}
    >
      <DateRangeSheet />

      <Button onClick={onClose} size="big" className="h-[44px] w-full">
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default MypageCommentsBottomSheet;
