import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalLayout from "./ModalLayout";

jest.mock("@/hooks", () => {
  return {
    __esModule: true,
    useModalLockAndEsc: jest.fn(),
    useModalBackdrop:
      ({ onClose }: { onClose?: () => void }) =>
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose?.();
      },
  };
});

const CHILD_TEXT = "모달 내용";

describe("ModalLayout", () => {
  it("isOpen=false일 때 렌더링되지 않습니다", () => {
    const { container } = render(
      <ModalLayout isOpen={false} onClose={jest.fn()} className="w-[300px]">
        <p>{CHILD_TEXT}</p>
      </ModalLayout>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("isOpen=true일 때 포털로 렌더링되고 자식이 표시됩니다", () => {
    render(
      <ModalLayout isOpen onClose={jest.fn()} className="h-[200px] w-[300px]">
        <h2 id="modal-title">제목</h2>
        <p id="modal-desc">{CHILD_TEXT}</p>
      </ModalLayout>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(dialog).toHaveAttribute("aria-describedby", "modal-desc");

    expect(screen.getByText(CHILD_TEXT)).toBeInTheDocument();
  });

  it("className이 dialog 래퍼에 합쳐집니다", () => {
    render(
      <ModalLayout isOpen onClose={jest.fn()} className="h-[240px] w-[420px]">
        <span>content</span>
      </ModalLayout>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("w-[420px]");
    expect(dialog).toHaveClass("h-[240px]");
  });

  it("백드롭을 클릭하면 onClose가 호출되고, 내부 클릭은 호출되지 않습니다", () => {
    const onClose = jest.fn();
    render(
      <ModalLayout isOpen onClose={onClose} className="w-[300px]">
        <button type="button">inside</button>
      </ModalLayout>
    );

    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement as HTMLDivElement;

    fireEvent.mouseDown(dialog);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseDown(backdrop, { target: backdrop });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
