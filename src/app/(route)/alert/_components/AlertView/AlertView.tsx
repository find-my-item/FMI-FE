"use client";

import { ConfirmModal } from "@/components/common";
import { useState } from "react";
import useNotificationDelete from "@/api/fetch/notification/api/useNotificationDelete";
import { AlertList, AlertDeleteSection } from "./_internal";

interface AlertViewProps {
  isDeleteMode: boolean;
  setIsDeleteMode: (isDeleteMode: boolean) => void;
}

const AlertView = ({ isDeleteMode, setIsDeleteMode }: AlertViewProps) => {
  const { mutate: deleteNotifications } = useNotificationDelete();
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteNotifications = () => {
    deleteNotifications({ ids: selectedNotifications });
    setSelectedNotifications([]);
    setIsDeleteMode(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AlertList
        isDeleteMode={isDeleteMode}
        selectedNotifications={selectedNotifications}
        setSelectedNotifications={setSelectedNotifications}
      />

      <AlertDeleteSection
        isDeleteMode={isDeleteMode}
        disabled={selectedNotifications.length === 0}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />

      <ConfirmModal
        title="정말로 알림을 삭제하시겠어요?"
        content="삭제한 알림은 복구할 수 없습니다."
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteNotifications}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default AlertView;
