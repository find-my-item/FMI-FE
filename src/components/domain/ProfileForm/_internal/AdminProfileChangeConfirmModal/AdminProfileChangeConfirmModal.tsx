import { Button } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";

interface AdminProfileChangeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminProfileChangeConfirmModal = ({
  isOpen,
  onClose,
}: AdminProfileChangeConfirmModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="rounded-[8px] p-6">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-h3-semibold text-layout-header-default">
          정말로 프로필을 변경하시겠습니까?
        </h2>
        <p className="text-body2-regular text-layout-body-default">
          현재 관리자 계정으로 로그인 중입니다.{`\n`}지금 프로필을 수정하시겠습니까?
        </p>
      </div>

      <div className="flex flex-1 items-center gap-2">
        <Button variant="outlined" className="min-h-11" onClick={onClose}>
          취소
        </Button>
        <Button className="min-h-11">변경하기</Button>
      </div>
    </ModalLayout>
  );
};

export default AdminProfileChangeConfirmModal;
