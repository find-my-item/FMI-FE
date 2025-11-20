import { useState } from "react";

interface UseDragSwipeProps {
  onPrev: () => void;
  onNext: () => void;
  threshold?: number; // 임계값, px
}

const useDragSwipe = ({ onPrev, onNext, threshold = 50 }: UseDragSwipeProps) => {
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    if ("touches" in e) setDragStartX(e.touches[0].clientX);
    else setDragStartX(e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || dragStartX === null) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = currentX - dragStartX;

    if (diff > threshold) {
      onPrev();
      setDragging(false);
    } else if (diff < -threshold) {
      onNext();
      setDragging(false);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDragStartX(null);
  };

  return { handleDragStart, handleDragMove, handleDragEnd };
};

export default useDragSwipe;
