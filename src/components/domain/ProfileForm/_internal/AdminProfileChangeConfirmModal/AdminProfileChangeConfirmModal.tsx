import { Button } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";

interface AdminProfileChangeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AdminProfileChangeConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: AdminProfileChangeConfirmModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="space-y-6 rounded-[8px] p-6">
      <div className="flex min-w-[300px] flex-col gap-1 text-center">
        <h2 className="text-h3-semibold text-layout-header-default">
          정말로 프로필을 변경하시겠습니까?
        </h2>
        <p className="whitespace-pre-line text-body2-regular text-layout-body-default">
          현재 관리자 계정으로 로그인 중입니다.{`\n`}지금 프로필을 수정하시겠습니까?
        </p>
      </div>

      <div className="flex flex-1 items-center gap-2">
        <Button variant="outlined" className="min-h-11 flex-1" onClick={onClose}>
          취소
        </Button>
        <Button className="min-h-11 flex-1" onClick={onConfirm}>
          변경하기
        </Button>
      </div>
    </ModalLayout>
  );
};

export default AdminProfileChangeConfirmModal;
