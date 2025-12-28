import { useEffect } from "react";

export const useUpdatePosition = (
  isOpen: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>,
  dropdownRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!containerRef.current || !dropdownRef.current) return;

      const { left, top, height } = containerRef.current.getBoundingClientRect();
      dropdownRef.current.style.left = `${left}px`;
      dropdownRef.current.style.top = `${top + height + 8}px`;
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);
};

export default useUpdatePosition;
