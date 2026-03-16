"use client";

import { Suspense, useState } from "react";
import { ProfileEditSection } from "@/components/domain";
import { AdminProfileChangeConfirmModal } from "@/components/domain/ProfileForm/_internal";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmSubmitFn, setConfirmSubmitFn] = useState<(() => void) | null>(null);

  const handleConfirmRequest = (submitFn: () => void) => {
    setConfirmSubmitFn(() => submitFn);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    confirmSubmitFn?.();
    setIsOpen(false);
  };

  return (
    <Suspense fallback={null}>
      <div className="h-base">
        <ProfileEditSection onConfirmRequest={handleConfirmRequest} />
      </div>
      <AdminProfileChangeConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </Suspense>
  );
};

export default page;
