import "@testing-library/jest-dom";
import { render, renderHook, fireEvent } from "@testing-library/react";
import { useHorizontalDragScroll } from "./useHorizontalDragScroll";

describe("useHorizontalDragScroll", () => {
  beforeEach(() => {
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  });

  it("ref와 onMouseDown을 반환한다", () => {
    const { result } = renderHook(() => useHorizontalDragScroll());

    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
    expect(typeof result.current.onMouseDown).toBe("function");
  });

  it("mousedown 시 preventDefault가 호출된다", () => {
    const TestComponent = () => {
      const { ref, onMouseDown } = useHorizontalDragScroll();
      return (
        <div ref={ref} onMouseDown={onMouseDown} data-testid="scroll-area">
          content
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const scrollArea = getByTestId("scroll-area");
    const event = new MouseEvent("mousedown", { bubbles: true, clientX: 100 });
    const preventDefaultSpy = jest.spyOn(event, "preventDefault");

    fireEvent(scrollArea, event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("mousedown 시 document.body 스타일이 grabbing으로 설정된다", () => {
    const TestComponent = () => {
      const { ref, onMouseDown } = useHorizontalDragScroll();
      return (
        <div ref={ref} onMouseDown={onMouseDown} data-testid="scroll-area">
          content
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const scrollArea = getByTestId("scroll-area");

    fireEvent.mouseDown(scrollArea, { pageX: 100 });

    expect(document.body.style.cursor).toBe("grabbing");
    expect(document.body.style.userSelect).toBe("none");
  });

  it("mousedown 시 document에 mousemove, mouseup 리스너가 등록된다", () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    const TestComponent = () => {
      const { ref, onMouseDown } = useHorizontalDragScroll();
      return (
        <div ref={ref} onMouseDown={onMouseDown} data-testid="scroll-area">
          content
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    fireEvent.mouseDown(getByTestId("scroll-area"), { pageX: 100 });

    expect(addSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));
    addSpy.mockRestore();
  });

  it("mouseup 시 document 리스너가 제거되고 body 스타일이 복원된다", () => {
    const TestComponent = () => {
      const { ref, onMouseDown } = useHorizontalDragScroll();
      return (
        <div ref={ref} onMouseDown={onMouseDown} data-testid="scroll-area">
          content
        </div>
      );
    };

    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");

    const { getByTestId } = render(<TestComponent />);
    const scrollArea = getByTestId("scroll-area");

    fireEvent.mouseDown(scrollArea, { pageX: 100 });
    expect(document.body.style.cursor).toBe("grabbing");

    fireEvent.mouseUp(document);

    expect(document.body.style.cursor).toBe("");
    expect(document.body.style.userSelect).toBe("");
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("ref가 연결되지 않은 상태에서 onMouseDown 호출 시 body 스타일이 변경되지 않는다", () => {
    const TestComponent = () => {
      const { onMouseDown } = useHorizontalDragScroll();
      return (
        <div onMouseDown={onMouseDown} data-testid="no-ref-area">
          content
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const noRefArea = getByTestId("no-ref-area");

    fireEvent.mouseDown(noRefArea, { pageX: 100 });

    expect(document.body.style.cursor).toBe("");
    expect(document.body.style.userSelect).toBe("");
  });
});
