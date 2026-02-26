import { Button } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";

interface MypageProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MypageProfileModal = ({ isOpen, onClose }: MypageProfileModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="p-6">
      <h3 className="text-h3-semibold text-layout-body-default">변경사항이 저장되지 않았습니다.</h3>
      <p>저장하지 않고 나가겠습니까?</p>
      <div className="flex">
        <Button variant="outlined">취소</Button>
        <Button>나가기</Button>
      </div>
    </ModalLayout>
  );
};

export default MypageProfileModal;
