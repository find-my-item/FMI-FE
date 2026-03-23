import { Button } from "@/components/common";

interface AlertDeleteSectionProps {
  isDeleteMode: boolean;
  disabled: boolean;
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
}

// TODO(형준): 알림 전체 삭제 API 반영 후 구현
const AlertDeleteSection = ({
  isDeleteMode,
  disabled,
  setIsDeleteModalOpen,
}: AlertDeleteSectionProps) => {
  return (
    <>
      {isDeleteMode && <div aria-hidden className="h-[86px]" />}
      {isDeleteMode && (
        <div className="fixed bottom-[86px] left-0 right-0 mx-auto flex max-w-[768px] gap-2 border-x-2 border-t border-t-divider-default bg-white px-4 pb-8 pt-3">
          <Button size="big" variant="outlined" className="w-[116px] text-system-warning">
            전체 삭제
          </Button>
          <Button
            size="big"
            disabled={disabled}
            className="flex-1"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            선택 삭제
          </Button>
        </div>
      )}
    </>
  );
};

export default AlertDeleteSection;
