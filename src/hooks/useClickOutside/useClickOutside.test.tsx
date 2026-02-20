import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import useClickOutside from "./useClickOutside";

describe("useClickOutside", () => {
  it("ref 객체를 반환해야 한다", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickOutside(callback));

    expect(result.current).toHaveProperty("current");
    expect(result.current).toEqual({ current: null });
  });

  it("ref가 가리키는 요소 바깥을 클릭하면 콜백이 호출되어야 한다", () => {
    const callback = jest.fn();

    const TestComponent = () => {
      const ref = useClickOutside(callback);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            내부
          </div>
          <div data-testid="outside">외부</div>
        </div>
      );
    };

    render(<TestComponent />);

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("ref가 가리키는 요소 내부를 클릭하면 콜백이 호출되지 않아야 한다", () => {
    const callback = jest.fn();

    const TestComponent = () => {
      const ref = useClickOutside(callback);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            내부
          </div>
          <div data-testid="outside">외부</div>
        </div>
      );
    };

    render(<TestComponent />);

    fireEvent.mouseDown(screen.getByTestId("inside"));

    expect(callback).not.toHaveBeenCalled();
  });

  it("언마운트 후 외부 클릭 시 콜백이 호출되지 않아야 한다", () => {
    const callback = jest.fn();

    const TestComponent = () => {
      const ref = useClickOutside(callback);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            내부
          </div>
          <div data-testid="outside">외부</div>
        </div>
      );
    };

    const { unmount } = render(<TestComponent />);
    unmount();

    fireEvent.mouseDown(document.body);

    expect(callback).not.toHaveBeenCalled();
  });
});
