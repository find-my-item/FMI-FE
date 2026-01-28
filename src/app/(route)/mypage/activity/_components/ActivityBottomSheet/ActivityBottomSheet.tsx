import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import DateRangeBottomSheet from "@/components/domain/DateRangeSheet/DateRangeSheet";
import { ACTIVITY_OPTIONS } from "../../_constants/ACTIVITY_OPTIONS";

interface ActivityBottomSheetProps {
  mode: "Date" | "Type";
  isOpen: boolean;
  onClose: () => void;
}

const ActivityBottomSheet = ({ mode, isOpen, onClose }: ActivityBottomSheetProps) => {
  if (mode === "Date") {
    return <DateRangeBottomSheet isOpen={isOpen} onClose={onClose} />;
  }

  const handleToggle = (value: any) => {};

  if (mode === "Type") {
    return (
      <PopupLayout className="w-full px-5 py-10 flex-col-center" isOpen={isOpen} onClose={onClose}>
        <h2 className="text-h2-medium text-layout-header-default">필터</h2>
        <div className="mt-8 flex w-full flex-wrap gap-x-2 gap-y-3">
          {ACTIVITY_OPTIONS.map((item) => {
            // const isSelected = selectedCategories.includes(item.value);

            return (
              <Filter
                key={item.value}
                ariaLabel={item.label}
                onSelected={false}
                onClick={() => handleToggle(item.value)}
              >
                {item.label}
              </Filter>
            );
          })}
        </div>

        <Button className="mt-12 w-full" onClick={onClose}>
          적용하기
        </Button>
      </PopupLayout>
    );
  }
};

export default ActivityBottomSheet;
