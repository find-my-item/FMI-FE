import { useCallback, useRef } from "react";

/**
 * 가로 스크롤 가능한 요소에 드래그로 스크롤하는 동작을 부여하는 훅입니다.
 * 반환된 ref를 스크롤 컨테이너에 연결하고, onMouseDown을 해당 요소에 전달하면 됩니다.
 *
 * @returns ref - 스크롤 컨테이너에 연결할 ref
 * @returns onMouseDown - 스크롤 컨테이너에 바인딩할 mousedown 핸들러
 */
export function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
    (e: React.MouseEvent) => {
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
}
