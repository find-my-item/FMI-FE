import { Button } from "@/components/common";
import { DateRangeSheet, PopupLayout } from "@/components/domain";

interface MypageCommentsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MypageCommentsBottomSheet = ({ isOpen, onClose }: MypageCommentsBottomSheetProps) => {
  return (
    <PopupLayout
      isOpen={isOpen}
      onClose={onClose}
      className="w-full gap-12 px-5 py-10 flex-col-center"
    >
      <DateRangeSheet />

      <Button onClick={onClose} size="big" className="h-11 w-full">
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default MypageCommentsBottomSheet;
