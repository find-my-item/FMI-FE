import { type MouseEvent, useCallback, useRef } from "react";

const useHorizontalDragScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const handleMouseMove = useCallback((e: DocumentEventMap["mousemove"]) => {
    if (!scrollRef.current) return;
    const dx = e.pageX - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftStartRef.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, [handleMouseMove]);

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!scrollRef.current) return;
      e.preventDefault();
      startXRef.current = e.pageX;
      scrollLeftStartRef.current = scrollRef.current.scrollLeft;
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  return { ref: scrollRef, onMouseDown };
};

export default useHorizontalDragScroll;
