import { ModalLayout } from "@/components";
import { cn } from "@/utils/cn/cn";

interface TempSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TempSaveModal = ({ isOpen, onClose }: TempSaveModalProps) => {
  const button = [
    {
      label: "취소",
      onClick: onClose,
      style: "border-neutral-normal-default border bg-white text-neutral-normal-default",
    },
    {
      label: "불러오기",
      onClick: () => {},
      style: "text-brand-normal-default bg-fill-brand-normal-default",
    },
  ];

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="w-[350px] gap-6 p-6 flex-col-center">
      <div className="gap-1 flex-col-center">
        <h2 className="text-h3-semibold text-layout-header-default">
          임시 저장한 게시글이 있습니다.
        </h2>
        <p className="text-body2-regular text-layout-body-default">
          임시 저장한 내용을 불러오시겠어요?
        </p>
      </div>
      <div className="flex w-full gap-2">
        {button.map((item) => (
          <button
            key={item.label}
            className={cn("h-[44px] flex-1 rounded-[10px] text-body1-semibold", item.style)}
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
      </div>
    </ModalLayout>
  );
};

export default TempSaveModal;
