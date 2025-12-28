import { renderHook } from "@testing-library/react";
import { useHandleClickOutside } from "./useHandleClickOutside";
import { createRef } from "react";

describe("useHandleClickOutside", () => {
  let containerRef: React.RefObject<HTMLDivElement | null>;
  let dropdownRef: React.RefObject<HTMLDivElement | null>;
  let setIsOpen: jest.Mock;

  beforeEach(() => {
    containerRef = createRef<HTMLDivElement>();
    dropdownRef = createRef<HTMLDivElement>();
    setIsOpen = jest.fn();

    // DOM에 실제 요소들을 추가
    const containerElement = document.createElement("div");
    containerElement.setAttribute("data-testid", "container");
    document.body.appendChild(containerElement);
    containerRef.current = containerElement;

    const dropdownElement = document.createElement("div");
    dropdownElement.setAttribute("data-testid", "dropdown");
    document.body.appendChild(dropdownElement);
    dropdownRef.current = dropdownElement;
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("isOpen이 false일 때는 mousedown 이벤트 리스너가 등록되지 않는다", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");

    renderHook(() => useHandleClickOutside(false, containerRef, dropdownRef, setIsOpen));

    const mousedownCalls = addEventListenerSpy.mock.calls.filter((call) => call[0] === "mousedown");
    expect(mousedownCalls).toHaveLength(0);
    addEventListenerSpy.mockRestore();
  });

  it("isOpen이 true일 때 이벤트 리스너가 등록된다", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");

    renderHook(() => useHandleClickOutside(true, containerRef, dropdownRef, setIsOpen));

    expect(addEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it("containerRef와 dropdownRef 외부를 클릭하면 setIsOpen(false)가 호출된다", () => {
    renderHook(() => useHandleClickOutside(true, containerRef, dropdownRef, setIsOpen));

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const mousedownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    outsideElement.dispatchEvent(mousedownEvent);

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it("containerRef 내부를 클릭하면 setIsOpen이 호출되지 않는다", () => {
    renderHook(() => useHandleClickOutside(true, containerRef, dropdownRef, setIsOpen));

    const insideElement = document.createElement("div");
    containerRef.current?.appendChild(insideElement);

    const mousedownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    insideElement.dispatchEvent(mousedownEvent);

    expect(setIsOpen).not.toHaveBeenCalled();
  });

  it("dropdownRef 내부를 클릭하면 setIsOpen이 호출되지 않는다", () => {
    renderHook(() => useHandleClickOutside(true, containerRef, dropdownRef, setIsOpen));

    const insideElement = document.createElement("div");
    dropdownRef.current?.appendChild(insideElement);

    const mousedownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    insideElement.dispatchEvent(mousedownEvent);

    expect(setIsOpen).not.toHaveBeenCalled();
  });

  it("cleanup 시 이벤트 리스너가 제거된다", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() =>
      useHandleClickOutside(true, containerRef, dropdownRef, setIsOpen)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it("isOpen이 false로 변경되면 이벤트 리스너가 제거된다", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { rerender } = renderHook(
      ({ isOpen }) => useHandleClickOutside(isOpen, containerRef, dropdownRef, setIsOpen),
      {
        initialProps: { isOpen: true },
      }
    );

    rerender({ isOpen: false });

    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it("containerRef가 null일 때는 외부 클릭 시 setIsOpen이 호출되지 않는다", () => {
    const nullContainerRef = createRef<HTMLDivElement>();

    renderHook(() => useHandleClickOutside(true, nullContainerRef, dropdownRef, setIsOpen));

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const mousedownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    outsideElement.dispatchEvent(mousedownEvent);

    // containerRef가 null이면 isOutsideContainer가 false가 되어 setIsOpen이 호출되지 않음
    expect(setIsOpen).not.toHaveBeenCalled();
  });

  it("dropdownRef가 null일 때는 외부 클릭 시 setIsOpen이 호출되지 않는다", () => {
    const nullDropdownRef = createRef<HTMLDivElement>();

    renderHook(() => useHandleClickOutside(true, containerRef, nullDropdownRef, setIsOpen));

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    const mousedownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    outsideElement.dispatchEvent(mousedownEvent);

    // dropdownRef가 null이면 isOutsideDropdown가 false가 되어 setIsOpen이 호출되지 않음
    expect(setIsOpen).not.toHaveBeenCalled();
  });
});
