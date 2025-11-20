import { useEffect, useState } from "react";

export const useDotNavigation = (isOpen: boolean, initialIndex = 0) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  const goTo = (index: number) => setCurrentIndex(index);
  return { currentIndex, goTo, setCurrentIndex };
};
