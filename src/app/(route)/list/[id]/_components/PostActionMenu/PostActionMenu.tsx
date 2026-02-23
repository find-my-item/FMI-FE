"use client";

import { useState } from "react";
import { cn } from "@/utils";
import { Button, Icon } from "@/components/common";
import { useDeleteDetailPost, usePutPostStatus } from "@/api/fetch/post";
import ModalLayout from "@/components/common/Modal/_internal/ModalLayout";
import { ACTION_MENU } from "./ACTION_MENU_STYLES";
import { PostReportBlockActions, ReportModal } from "@/components/domain";
import { PostActionData } from "../../_types/PostActionType";
import UserBlockModal from "@/components/domain/PostReportBlockActions/_internal/UserBlockModal/UserBlockModal";

interface PostOptionBoxProps {
  open: boolean;
  onClose: () => void;
  postId: number;
  postData: PostActionData;
}

const PostActionMenu = ({ open, onClose, postId, postData }: PostOptionBoxProps) => {
  const { isMine, writerId, postStatus } = postData;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  const { mutate: putPostStatus } = usePutPostStatus(postId);
  const isFound = postStatus === "FOUND";

  const handleStatusChange = () => {
    putPostStatus({ postStatus: isFound ? "SEARCHING" : "FOUND" });
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        className={cn(
          "absolute left-[40%] top-[60%] z-10 mt-2",
          "min-h-[114px] w-[218px] overflow-hidden rounded-[20px] flex-col-center",
          "border border-white bg-fill-neutral-subtle-default",
          "text-nowrap text-h3-medium text-neutral-normal-default shadow-sm",
          "tablet:left-[70%]"
        )}
      >
        {isMine ? (
          <>
            <button className={ACTION_MENU.buttonStyle}>
              <Icon name="Edit" size={20} />
              <span>게시글 수정하기</span>
            </button>
            <hr className={ACTION_MENU.hrStyle} aria-hidden="true" />
            <button className={ACTION_MENU.buttonStyle} onClick={() => setDeleteModalOpen(true)}>
              <Icon name="Trash" size={20} />
              <span className="text-system-warning">게시글 삭제하기</span>
            </button>
            <hr className={ACTION_MENU.hrStyle} aria-hidden="true" />
            <button className={ACTION_MENU.buttonStyle} onClick={handleStatusChange}>
              <Icon name="ArrowSwitchHorizontal" size={20} />
              <span>{isFound ? "찾는중 상태로 변경" : "찾았음 상태로 변경"}</span>
            </button>
          </>
        ) : (
          <PostReportBlockActions
            onOpenReport={() => setIsReportOpen(true)}
            onOpenBlock={() => setIsBlockOpen(true)}
          />
        )}
      </div>

      <PostDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        postId={postId}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="POST"
        targetId={postId}
      />

      <UserBlockModal
        isOpen={isBlockOpen}
        onClose={() => setIsBlockOpen(false)}
        writerId={writerId}
      />
    </>
  );
};

export default PostActionMenu;

interface PostDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const PostDeleteModal = ({ isOpen, onClose, postId }: PostDeleteModalProps) => {
  const { mutate: deletePost } = useDeleteDetailPost(postId);

  const handleDeletePost = (postId: number) => {
    deletePost({ postId });
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      className="min-w-[350px] gap-6 rounded-[8px] p-6 flex-col-center"
    >
      <div className="space-y-1 text-center">
        <h2 className="text-h3-semibold text-layout-header-default">정말로 삭제하시겠습니까?</h2>
        <p className="text-body5-regular text-layout-body-default">
          게시글 삭제 후에는 취소가 불가능합니다.
        </p>
      </div>
      <div className="w-full gap-2 flex-center">
        <Button variant="outlined" onClick={onClose} className={ACTION_MENU.deleteButtonStyle}>
          취소
        </Button>
        <Button onClick={() => handleDeletePost(postId)} className={ACTION_MENU.deleteButtonStyle}>
          삭제하기
        </Button>
      </div>
    </ModalLayout>
  );
};
