import { ModalLayout } from "@/components";
import { cn } from "@/utils/cn";

interface TempSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = {
  button: "h-[44px] flex-1 rounded-[10px] leading-[150%]",
};

const TempSaveModal = ({ isOpen, onClose }: TempSaveModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="w-[350px] gap-6 p-6 flex-col-center">
      <div className="gap-1 flex-col-center">
        <h2 className="text-[18px] font-bold leading-[140%] text-[#363636]">
          임시 저장한 게시글이 있습니다.
        </h2>
        <p className="text-[14px] leading-[140%] text-[#787878]">
          임시 저장한 내용을 불러오시겠어요?
        </p>
      </div>
      <div className="flex w-full gap-2">
        <button
          className={cn(styles.button, "border border-[#CFCFCF] bg-[#FFFFFF] text-[#5D5D5D]")}
          onClick={() => onClose()}
        >
          취소
        </button>
        <button className={cn(styles.button, "bg-[#1EB87B]/70 text-[#F6FFFC]")}>불러오기</button>
      </div>
    </ModalLayout>
  );
};

export default TempSaveModal;
