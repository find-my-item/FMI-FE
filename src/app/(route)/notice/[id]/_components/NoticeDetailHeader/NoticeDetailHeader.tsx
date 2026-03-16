"use client";

import { useGetUsersMe } from "@/api/fetch/user";
import { Button, KebabMenu } from "@/components/common";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";
import { DetailHeader } from "@/components/layout";
import { HeaderMenu, HeaderShare } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { useClickOutside } from "@/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NoticeDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const NoticeDeleteModal = ({ isOpen, onClose, postId }: NoticeDeleteModalProps) => {
  const BUTTON_STYLE = "min-h-11 flex-1";

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      className="min-w-[350px] gap-6 rounded-[8px] p-6 flex-col-center"
    >
      <div className="space-y-1 text-center">
        <h2 className="text-h3-semibold text-layout-header-default">정말로 삭제하시겠습니까?</h2>
        <p className="text-body2-regular text-layout-body-default">
          게시글 삭제 후에는 취소가 불가능합니다.
        </p>
      </div>
      <div className="w-full gap-2 flex-center">
        <Button variant="outlined" onClick={onClose} className={BUTTON_STYLE}>
          취소
        </Button>
        <Button onClick={onClose} className={BUTTON_STYLE}>
          삭제하기
        </Button>
      </div>
    </ModalLayout>
  );
};

const NoticeDetailHeader = ({ id }: { id: number }) => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const kebabMenuRef = useClickOutside(() => setIsKebabMenuOpen(false));
  const { data: userData } = useGetUsersMe();
  const router = useRouter();
  const isAdmin = userData?.result?.role === "ADMIN";

  return (
    <div className="relative" ref={kebabMenuRef}>
      <DetailHeader>
        <HeaderShare />
        {isAdmin && <HeaderMenu onClick={() => setIsKebabMenuOpen((prev) => !prev)} />}
      </DetailHeader>

      {isKebabMenuOpen && (
        <div className="absolute right-5 top-[54px] z-40">
          <KebabMenu
            items={[
              {
                text: "게시글 수정하기",
                icon: { name: "Edit" },
                onClick: () => {
                  router.push(`/admin/notice/write/${id}`);
                },
              },
              {
                text: "게시글 삭제하기",
                icon: { name: "Trash" },
                onClick: () => setIsDeleteModalOpen(true),
              },
            ]}
          />
        </div>
      )}
      <NoticeDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        postId={1}
      />
    </div>
  );
};

export default NoticeDetailHeader;
