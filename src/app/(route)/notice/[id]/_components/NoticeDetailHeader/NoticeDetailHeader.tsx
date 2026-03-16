"use client";

import { useGetUsersMe } from "@/api/fetch/user";
import { KebabMenu } from "@/components/common";
import { DetailHeader } from "@/components/layout";
import { HeaderMenu, HeaderShare } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { useClickOutside } from "@/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NoticeDeleteModal from "./_internal/NoticeDeleteModal";

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
        postId={id}
      />
    </div>
  );
};

export default NoticeDetailHeader;
