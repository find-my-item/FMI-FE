"use client";

import { useState } from "react";
import useNotificationDelete from "@/api/fetch/notification/api/useNotificationDelete";
import { AlertList, AlertDeleteSection, AlertDeleteModal } from "./_internal";

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

      <AlertDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteNotifications}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default AlertView;
