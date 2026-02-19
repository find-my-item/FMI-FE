import { useEffect, useRef } from "react";

/**
 * @author hyungjun
 *
 * ref가 가리키는 요소 바깥을 클릭했을 때 콜백을 실행하는 커스텀 훅입니다.
 *
 * 드롭다운, 모달, 팝오버 등 외부 클릭 시 닫기 동작이 필요할 때 사용합니다.
 *
 * @param callback - 요소 바깥을 클릭했을 때 실행할 함수
 * @returns 요소에 연결할 ref (제네릭 미지정 시 HTMLDivElement)
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * const ref = useClickOutside(() => setIsOpen(false)); // div ref (기본)
 *
 * return (
 *   <div ref={ref}>
 *     <button onClick={() => setIsOpen(true)}>열기</button>
 *     {isOpen && <Dropdown />}
 *   </div>
 * );
 *
 * // section, main 등 다른 요소에도 사용 가능
 * const sectionRef = useClickOutside<HTMLElement>(() => close());
 * return <section ref={sectionRef}>...</section>;
 * ```
 */

const useClickOutside = <T extends HTMLElement = HTMLDivElement>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);

  return ref;
};

export default useClickOutside;
