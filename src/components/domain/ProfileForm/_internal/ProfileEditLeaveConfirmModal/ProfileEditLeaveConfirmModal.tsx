import { Button } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";
import { useRouter } from "next/navigation";

interface ProfileEditLeaveConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditLeaveConfirmModal = ({ isOpen, onClose }: ProfileEditLeaveConfirmModalProps) => {
  const router = useRouter();

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} className="min-w-[350px] p-6 flex-col-center">
      <h3 className="mb-1 text-h3-semibold text-layout-header-default">
        변경사항이 저장되지 않았습니다.
      </h3>
      <p className="text-body2-regular text-layout-body-default">저장하지 않고 나가겠습니까?</p>
      <div className="mt-6 gap-2 flex-center">
        <Button size="big" variant="outlined" className="!min-w-full" onClick={onClose}>
          취소
        </Button>
        <Button size="big" className="!min-w-full" onClick={() => router.push("/mypage")}>
          나가기
        </Button>
      </div>
    </ModalLayout>
  );
};

export default ProfileEditLeaveConfirmModal;
