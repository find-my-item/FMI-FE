import { Button } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";

interface UserBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const UserBlockModal = ({ isOpen, onClose, userId }: UserBlockModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="space-y-6 rounded-[8px] bg-white p-6">
      <div className="space-y-1 text-center">
        <p className="text-h3-semibold text-layout-header-default">해당 유저를 차단하시겠습니까?</p>
        <span className="text-body2-regular text-layout-body-default">
          차단한 유저의 게시글과 댓글을 볼 수 없게 됩니다.
        </span>
      </div>
      <div className="w-full gap-2 flex-center">
        <Button variant="outlined" className="min-h-11 flex-1">
          취소
        </Button>
        <Button className="min-h-11 flex-1">차단하기</Button>
      </div>
    </ModalLayout>
  );
};

export default UserBlockModal;
