import { renderHook } from "@testing-library/react";
import { useUpdatePosition } from "./useUpdatePosition";
import { createRef } from "react";

describe("useUpdatePosition", () => {
  let containerRef: React.RefObject<HTMLDivElement | null>;
  let dropdownRef: React.RefObject<HTMLDivElement | null>;

  beforeEach(() => {
    containerRef = createRef<HTMLDivElement>();
    dropdownRef = createRef<HTMLDivElement>();

    // DOM에 실제 요소들을 추가
    const containerElement = document.createElement("div");
    containerElement.setAttribute("data-testid", "container");
    document.body.appendChild(containerElement);
    containerRef.current = containerElement;

    const dropdownElement = document.createElement("div");
    dropdownElement.setAttribute("data-testid", "dropdown");
    document.body.appendChild(dropdownElement);
    dropdownRef.current = dropdownElement;

    // getBoundingClientRect를 모킹
    jest.spyOn(containerRef.current, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 200,
      height: 50,
      width: 200,
      bottom: 250,
      right: 300,
      x: 100,
      y: 200,
      toJSON: jest.fn(),
    } as DOMRect);
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("isOpen이 false일 때는 scroll/resize 이벤트 리스너가 등록되지 않는다", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");

    renderHook(() => useUpdatePosition(false, containerRef, dropdownRef));

    const scrollCalls = addEventListenerSpy.mock.calls.filter((call) => call[0] === "scroll");
    const resizeCalls = addEventListenerSpy.mock.calls.filter((call) => call[0] === "resize");
    expect(scrollCalls).toHaveLength(0);
    expect(resizeCalls).toHaveLength(0);
    addEventListenerSpy.mockRestore();
  });

  it("isOpen이 true일 때 이벤트 리스너가 등록된다", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");

    renderHook(() => useUpdatePosition(true, containerRef, dropdownRef));

    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), true);
    expect(addEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it("isOpen이 true일 때 updatePosition이 호출되어 dropdown 위치가 업데이트된다", () => {
    renderHook(() => useUpdatePosition(true, containerRef, dropdownRef));

    expect(dropdownRef.current?.style.left).toBe("100px");
    expect(dropdownRef.current?.style.top).toBe("258px"); // 200 + 50 + 8
  });

  it("scroll 이벤트 시 updatePosition이 호출된다", () => {
    renderHook(() => useUpdatePosition(true, containerRef, dropdownRef));

    // 초기 위치 설정
    dropdownRef.current!.style.left = "0px";
    dropdownRef.current!.style.top = "0px";

    // scroll 이벤트 발생
    window.dispatchEvent(new Event("scroll"));

    expect(dropdownRef.current?.style.left).toBe("100px");
    expect(dropdownRef.current?.style.top).toBe("258px");
  });

  it("resize 이벤트 시 updatePosition이 호출된다", () => {
    renderHook(() => useUpdatePosition(true, containerRef, dropdownRef));

    // 초기 위치 설정
    dropdownRef.current!.style.left = "0px";
    dropdownRef.current!.style.top = "0px";

    // resize 이벤트 발생
    window.dispatchEvent(new Event("resize"));

    expect(dropdownRef.current?.style.left).toBe("100px");
    expect(dropdownRef.current?.style.top).toBe("258px");
  });

  it("cleanup 시 이벤트 리스너가 제거된다", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useUpdatePosition(true, containerRef, dropdownRef));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), true);
    expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it("isOpen이 false로 변경되면 이벤트 리스너가 제거된다", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { rerender } = renderHook(
      ({ isOpen }) => useUpdatePosition(isOpen, containerRef, dropdownRef),
      {
        initialProps: { isOpen: true },
      }
    );

    rerender({ isOpen: false });

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), true);
    expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it("containerRef가 null일 때는 updatePosition이 실행되지 않는다", () => {
    const nullContainerRef = createRef<HTMLDivElement>();

    renderHook(() => useUpdatePosition(true, nullContainerRef, dropdownRef));

    // dropdown의 style이 변경되지 않아야 함
    expect(dropdownRef.current?.style.left).toBe("");
    expect(dropdownRef.current?.style.top).toBe("");
  });

  it("dropdownRef가 null일 때는 updatePosition이 실행되지 않는다", () => {
    const nullDropdownRef = createRef<HTMLDivElement>();

    renderHook(() => useUpdatePosition(true, containerRef, nullDropdownRef));

    // 에러가 발생하지 않아야 함 (null 체크로 인해)
    expect(nullDropdownRef.current).toBeNull();
  });

  it("getBoundingClientRect의 값이 변경되면 dropdown 위치가 업데이트된다", () => {
    renderHook(() => useUpdatePosition(true, containerRef, dropdownRef));

    // 새로운 getBoundingClientRect 값 설정
    jest.spyOn(containerRef.current!, "getBoundingClientRect").mockReturnValue({
      left: 300,
      top: 400,
      height: 100,
      width: 200,
      bottom: 500,
      right: 500,
      x: 300,
      y: 400,
      toJSON: jest.fn(),
    } as DOMRect);

    // scroll 이벤트로 위치 업데이트
    window.dispatchEvent(new Event("scroll"));

    expect(dropdownRef.current?.style.left).toBe("300px");
    expect(dropdownRef.current?.style.top).toBe("508px"); // 400 + 100 + 8
  });
});
