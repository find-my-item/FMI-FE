import Link from "next/link";
import { Button } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";

interface GuestLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuestLoginModal = ({ isOpen, onClose }: GuestLoginModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="space-y-6 rounded-[8px] p-6">
      <div className="gap-1 text-center flex-col-center">
        <h2 className="text-h3-semibold text-layout-header-default">
          회원만 댓글을 작성할 수 있어요.
        </h2>
        <p className="text-body2-regular text-layout-body-default">로그인하고 의견을 남겨보세요.</p>
      </div>
      <div className="w-full gap-2 flex-center">
        <Button variant="outlined" className="min-h-11 min-w-[147px] flex-1" onClick={onClose}>
          취소
        </Button>
        <Button as={Link} href="/login" className="min-h-11 min-w-[147px] flex-1">
          로그인
        </Button>
      </div>
    </ModalLayout>
  );
};

export default GuestLoginModal;
