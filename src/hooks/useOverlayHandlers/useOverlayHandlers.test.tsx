import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { useModalLockAndEsc, useModalBackdrop } from "./useOverlayHandlers";

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

describe("useModalLockAndEsc", () => {
  const Test = ({ isOpen, onClose }: { isOpen: boolean; onClose?: () => void }) => {
    useModalLockAndEsc({ isOpen, onClose });
    return <div>test</div>;
  };

  it("모달이 열리면 body 스크롤을 잠그고 ESC로 onClose를 호출합니다.", () => {
    const onClose = jest.fn();

    render(<Test isOpen={true} onClose={onClose} />);

    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("언마운트 시 body overflow를 이전 값으로 복원합니다.", () => {
    const onClose = jest.fn();
    document.body.style.overflow = "scroll";

    const { unmount } = render(<Test isOpen={true} onClose={onClose} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("scroll");
  });

  it("isOpen=false이면 스크롤 잠금과 키 이벤트가 설정되지 않습니다.", () => {
    const onClose = jest.fn();

    render(<Test isOpen={false} onClose={onClose} />);

    expect(document.body.style.overflow).toBe("");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("useModalBackdrop", () => {
  const BackdropTest = ({ onClose }: { onClose: () => void }) => {
    const onBackdropMouseDown = useModalBackdrop({ onClose });

    return (
      <div data-testid="backdrop" onMouseDown={onBackdropMouseDown}>
        <div data-testid="content">content</div>
      </div>
    );
  };

  it("배경을 클릭하면 onClose가 호출됩니다.", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<BackdropTest onClose={onClose} />);

    fireEvent.mouseDown(getByTestId("backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("콘텐츠를 클릭하면 onClose가 호출되지 않습니다.", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<BackdropTest onClose={onClose} />);

    fireEvent.mouseDown(getByTestId("content"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
