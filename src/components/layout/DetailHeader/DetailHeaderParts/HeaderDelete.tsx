"use client";

import { Icon } from "@/components/common";

interface HeaderDeleteProps {
  isDeleteMode: boolean;
  setIsDeleteMode: (isDeleteMode: boolean) => void;
}

const HeaderDelete = ({ isDeleteMode, setIsDeleteMode }: HeaderDeleteProps) => {
  return (
    <button
      type="button"
      aria-label={isDeleteMode ? "삭제 화면 취소" : "삭제 화면 진입"}
      onClick={() => setIsDeleteMode(!isDeleteMode)}
    >
      {/* TODO(형준): 아이콘 색상 변경 필요 */}
      {!isDeleteMode ? (
        <Icon name="Trash" size={24} />
      ) : (
        <span className="text-h3-medium text-layout-header-default">취소</span>
      )}
    </button>
  );
};

export default HeaderDelete;
