import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ReportReasonModal from "./ReportReasonModal";
import { ReportReason } from "../_types/ReportReason";

jest.mock("@/components", () => ({
  Button: ({ children, disabled, onClick, type, className, ...rest }: any) => (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      data-testid="submit-button"
      {...rest}
    >
      {children}
    </button>
  ),
}));

describe("ReportReasonModal", () => {
  const mockOnClose = jest.fn();
  const mockSetSelectedReportReason = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("isOpen이 false일 때 렌더링되지 않습니다", () => {
    const { container } = render(
      <ReportReasonModal
        isOpen={false}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    expect(container.firstChild).toBeNull();
    expect(screen.queryByText("신고 사유 선택")).not.toBeInTheDocument();
  });

  it("isOpen이 true일 때 모달이 렌더링됩니다", () => {
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    expect(screen.getByText("신고 사유 선택")).toBeInTheDocument();
  });

  it("제목이 올바르게 표시됩니다", () => {
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    const heading = screen.getByRole("heading", { name: "신고 사유 선택" });
    expect(heading).toBeInTheDocument();
  });

  it("모든 신고 사유 옵션이 렌더링됩니다", () => {
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    expect(screen.getByText("실제 분실물/습득물이 아닌 내용이에요.")).toBeInTheDocument();
    expect(screen.getByText("동일한 내용이 여러 번 올라왔어요.")).toBeInTheDocument();
    expect(screen.getByText("분실물과 무관한 홍보성 게시글이에요.")).toBeInTheDocument();
    expect(screen.getByText("채팅 또는 댓글에 모욕적 표현이 있어요.")).toBeInTheDocument();
    expect(screen.getByText("물건 반환을 빌미로 금전 요구가 있어요.")).toBeInTheDocument();
    expect(screen.getByText("실제 주인이 아닌 사람이 소유를 주장해요.")).toBeInTheDocument();
    expect(screen.getByText("위 항목 외의 다른 문제를 신고해요.")).toBeInTheDocument();
  });

  it("라디오 버튼 선택이 작동합니다", async () => {
    const user = userEvent.setup();
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    const firstRadio = screen.getByLabelText("실제 분실물/습득물이 아닌 내용이에요.");
    await user.click(firstRadio);

    expect(firstRadio).toBeChecked();
  });

  it("선택하기 버튼이 선택 없을 때 disabled 상태입니다", () => {
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
  });

  it("선택하기 버튼이 선택 있을 때 enabled 상태입니다", async () => {
    const user = userEvent.setup();
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    const firstRadio = screen.getByLabelText("실제 분실물/습득물이 아닌 내용이에요.");
    await user.click(firstRadio);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).not.toBeDisabled();
  });

  it("폼 제출 시 setSelectedReportReason이 호출되고 onClose가 호출됩니다", async () => {
    const user = userEvent.setup();
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    const firstRadio = screen.getByLabelText("실제 분실물/습득물이 아닌 내용이에요.");
    await user.click(firstRadio);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(mockSetSelectedReportReason).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedReportReason).toHaveBeenCalledWith({
      value: "1",
      label: "실제 분실물/습득물이 아닌 내용이에요.",
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("백드롭 클릭 시 onClose가 호출됩니다", () => {
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    // createPortal로 렌더링되므로 document.body에서 찾습니다
    const backdrop = document.body.querySelector(".fixed.inset-0") as HTMLElement;
    expect(backdrop).toBeInTheDocument();

    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("폼 내부 클릭 시 onClose가 호출되지 않습니다", () => {
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    // createPortal로 렌더링되므로 document.body에서 찾습니다
    const form = document.body.querySelector("form") as HTMLElement;
    expect(form).toBeInTheDocument();

    fireEvent.click(form);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("isOpen이 true일 때 body overflow가 hidden으로 설정됩니다", () => {
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("isOpen이 false일 때 body overflow가 초기화됩니다", () => {
    const { rerender } = render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <ReportReasonModal
        isOpen={false}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    expect(document.body.style.overflow).toBe("");
  });

  it("selectedReportReason이 전달되면 초기값으로 설정됩니다", () => {
    const selectedReason: ReportReason = {
      value: "2",
      label: "동일한 내용이 여러 번 올라왔어요.",
    };

    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={selectedReason}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    const secondRadio = screen.getByLabelText("동일한 내용이 여러 번 올라왔어요.");
    expect(secondRadio).toBeChecked();
  });

  it("다른 옵션을 선택하면 이전 선택이 해제됩니다", async () => {
    const user = userEvent.setup();
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    const firstRadio = screen.getByLabelText("실제 분실물/습득물이 아닌 내용이에요.");
    const secondRadio = screen.getByLabelText("동일한 내용이 여러 번 올라왔어요.");

    await user.click(firstRadio);
    expect(firstRadio).toBeChecked();
    expect(secondRadio).not.toBeChecked();

    await user.click(secondRadio);
    expect(firstRadio).not.toBeChecked();
    expect(secondRadio).toBeChecked();
  });

  it("선택 없이 폼 제출 시 아무 동작도 하지 않습니다", async () => {
    render(
      <ReportReasonModal
        isOpen={true}
        onClose={mockOnClose}
        selectedReportReason={null}
        setSelectedReportReason={mockSetSelectedReportReason}
      />
    );

    // createPortal로 렌더링되므로 document.body에서 찾습니다
    const form = document.body.querySelector("form") as HTMLFormElement;
    expect(form).toBeInTheDocument();

    fireEvent.submit(form);
    expect(mockSetSelectedReportReason).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
