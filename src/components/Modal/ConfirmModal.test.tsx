import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmModal from "./ConfirmModal";

const ModalLayoutMock = ({ isOpen, onClose, className, children }: any) => {
  if (!isOpen) return null;
  return (
    <div
      data-testid="backdrop"
      className={className}
      onMouseDown={(e) => e.currentTarget === e.target && onClose?.()}
    >
      <div data-testid="content" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const IconMock = (props: any) => <div data-testid="icon" {...props} />;

jest.mock("./_internal/ModalLayout", () => ({
  __esModule: true,
  default: (props: any) => ModalLayoutMock(props),
}));

jest.mock("../Icon/Icon", () => ({
  __esModule: true,
  default: (props: any) => IconMock(props),
}));

describe("<ConfirmModal />", () => {
  const baseProps = {
    title: "제목",
    content: "내용",
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("isOpen=false이면 렌더하지 않습니다.", () => {
    const { container } = render(<ConfirmModal {...baseProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByText("제목")).not.toBeInTheDocument();
  });

  it("열렸을 때 제목과 내용을 렌더합니다.", () => {
    render(<ConfirmModal {...baseProps} />);
    expect(screen.getByText("제목")).toBeInTheDocument();
    expect(screen.getByText("내용")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("아이콘 props가 있으면 아이콘을 렌더합니다.", () => {
    render(<ConfirmModal {...baseProps} icon={{ name: "Logo", size: 24, title: "로고" }} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("확인/취소 버튼 클릭 시 핸들러를 호출합니다.", () => {
    render(<ConfirmModal {...baseProps} />);
    fireEvent.click(screen.getByRole("button", { name: "확인" }));
    expect(baseProps.onConfirm).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "취소" }));
    expect(baseProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("백드롭 mousedown 시 onClose를 호출합니다.", () => {
    render(<ConfirmModal {...baseProps} />);
    const backdrop = screen.getByTestId("backdrop");
    fireEvent.mouseDown(backdrop);
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("컨텐츠 영역 mousedown은 전파가 차단되어 onClose가 호출되지 않습니다.", () => {
    render(<ConfirmModal {...baseProps} />);
    const content = screen.getByTestId("content");
    fireEvent.mouseDown(content);
    expect(baseProps.onClose).not.toHaveBeenCalled();
  });

  it('size="small"일 때 클래스 병합이 전달됩니다. (스냅샷 수준 검증)', () => {
    const { getByTestId } = render(<ConfirmModal {...baseProps} size="small" />);
    const backdrop = getByTestId("backdrop");
    expect(backdrop.className).toContain("p-6");
  });
});
