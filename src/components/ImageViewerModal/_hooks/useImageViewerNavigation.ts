import { useEffect } from "react";

interface UseImageViewerNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

const useImageViewerNavigation = ({
  isOpen,
  onClose,
  handlePrev,
  handleNext,
}: UseImageViewerNavigationProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handlePrev, handleNext, onClose]);
};

export default useImageViewerNavigation;
