import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatReportPage from "./page";
import { ToastContext } from "@/context/ToastContext";
import { useFormContext } from "react-hook-form";

const mockAddToast = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, back: mockBack }),
}));

// InputField를 react-hook-form과 연동되도록 모킹
const MockInputField = ({ name, label, placeholder, maxLength }: any) => {
  const { register } = useFormContext();
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
        data-testid={`input-${name}`}
      />
    </div>
  );
};

jest.mock("@/components", () => {
  const React = require("react");
  const { useFormContext } = require("react-hook-form");

  const MockInputField = ({ name, label, placeholder, maxLength }: any) => {
    const { register } = useFormContext();
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          maxLength={maxLength}
          data-testid={`input-${name}`}
        />
      </div>
    );
  };

  return {
    Icon: ({ name, size, ...rest }: any) => (
      <span data-testid={`icon-${name}`} data-size={size} {...rest} />
    ),
    InputField: MockInputField,
    RequiredText: () => <span data-testid="required-text">*</span>,
    Button: ({ children, disabled, type, onClick, className, ...rest }: any) => (
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
  };
});

jest.mock("@/components/layout", () => ({
  DetailHeader: ({ title }: { title: string }) => <div data-testid="detail-header">{title}</div>,
}));

jest.mock("./_components", () => ({
  ReportReasonModal: ({ isOpen, onClose, selectedReportReason, setSelectedReportReason }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="report-reason-modal">
        <button onClick={onClose} data-testid="modal-close">
          닫기
        </button>
        <button
          onClick={() => setSelectedReportReason({ value: "1", label: "테스트 사유" })}
          data-testid="modal-select"
        >
          선택
        </button>
      </div>
    );
  },
}));

jest.mock("@/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

const renderWithToastProvider = () => {
  return render(
    <ToastContext.Provider value={{ addToast: mockAddToast }}>
      <ChatReportPage />
    </ToastContext.Provider>
  );
};

describe("ChatReportPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("DetailHeader가 올바른 제목으로 렌더링됩니다", () => {
    renderWithToastProvider();

    expect(screen.getByTestId("detail-header")).toHaveTextContent("신고하기");
  });

  it("신고 사유 선택 버튼이 렌더링됩니다", () => {
    renderWithToastProvider();

    const button = screen.getByText("신고 사유를 선택해 주세요.");
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("icon-ArrowDown")).toBeInTheDocument();
  });

  it("신고 사유 선택 버튼 클릭 시 모달이 열립니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    const button = screen.getByText("신고 사유를 선택해 주세요.");
    await user.click(button);

    expect(screen.getByTestId("report-reason-modal")).toBeInTheDocument();
  });

  it("신고 사유가 선택되면 버튼 텍스트가 변경됩니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    // 모달 열기
    const selectButton = screen.getByText("신고 사유를 선택해 주세요.");
    await user.click(selectButton);

    // 모달에서 선택
    const modalSelect = screen.getByTestId("modal-select");
    await user.click(modalSelect);

    // 버튼 텍스트가 변경되었는지 확인
    expect(screen.getByText("테스트 사유")).toBeInTheDocument();
    expect(screen.queryByText("신고 사유를 선택해 주세요.")).not.toBeInTheDocument();
  });

  it("InputField가 올바르게 렌더링됩니다", () => {
    renderWithToastProvider();

    expect(screen.getByLabelText("신고 내용 (선택)")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("신고 사유를 입력해주세요. (최대 300자)")
    ).toBeInTheDocument();
    const textarea = screen.getByTestId("input-report");
    expect(textarea).toHaveAttribute("maxLength", "299");
  });

  it("제출 버튼이 초기에는 disabled 상태입니다", () => {
    renderWithToastProvider();

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("차단 및 신고하기");
  });

  it("신고 사유만 선택하고 내용을 입력하지 않으면 버튼이 disabled 상태입니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    // 신고 사유 선택
    const selectButton = screen.getByText("신고 사유를 선택해 주세요.");
    await user.click(selectButton);
    const modalSelect = screen.getByTestId("modal-select");
    await user.click(modalSelect);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
  });

  it("내용만 입력하고 신고 사유를 선택하지 않으면 버튼이 disabled 상태입니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    const textarea = screen.getByTestId("input-report");
    await user.type(textarea, "신고 내용");

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
  });

  it("신고 사유와 내용을 모두 입력하면 버튼이 enabled 상태입니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    // 신고 사유 선택
    const selectButton = screen.getByText("신고 사유를 선택해 주세요.");
    await user.click(selectButton);
    const modalSelect = screen.getByTestId("modal-select");
    await user.click(modalSelect);

    // 내용 입력
    const textarea = screen.getByTestId("input-report");
    await user.type(textarea, "신고 내용");

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).not.toBeDisabled();
  });

  it("폼 제출 시 addToast와 router.replace가 호출됩니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    // 신고 사유 선택
    const selectButton = screen.getByText("신고 사유를 선택해 주세요.");
    await user.click(selectButton);
    const modalSelect = screen.getByTestId("modal-select");
    await user.click(modalSelect);

    // 내용 입력
    const textarea = screen.getByTestId("input-report");
    await user.type(textarea, "신고 내용");

    // 폼 제출
    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(mockAddToast).toHaveBeenCalledWith("신고가 접수되었습니다.", "success");
    expect(mockReplace).toHaveBeenCalledWith("/chat");
  });

  it("신고 사유 없이 폼 제출 시 아무 동작도 하지 않습니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    // 내용만 입력
    const textarea = screen.getByTestId("input-report");
    await user.type(textarea, "신고 내용");

    // 제출 버튼이 disabled이므로 직접 submit 이벤트 발생
    const form = textarea.closest("form");
    if (form) {
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }

    expect(mockAddToast).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("내용 없이 폼 제출 시 아무 동작도 하지 않습니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    // 신고 사유만 선택
    const selectButton = screen.getByText("신고 사유를 선택해 주세요.");
    await user.click(selectButton);
    const modalSelect = screen.getByTestId("modal-select");
    await user.click(modalSelect);

    // 제출 버튼이 disabled이므로 직접 submit 이벤트 발생
    const textarea = screen.getByTestId("input-report");
    const form = textarea.closest("form");
    if (form) {
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }

    expect(mockAddToast).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("모달 닫기 버튼 클릭 시 모달이 닫힙니다", async () => {
    const user = userEvent.setup();
    renderWithToastProvider();

    // 모달 열기
    const selectButton = screen.getByText("신고 사유를 선택해 주세요.");
    await user.click(selectButton);

    expect(screen.getByTestId("report-reason-modal")).toBeInTheDocument();

    // 모달 닫기
    const modalClose = screen.getByTestId("modal-close");
    await user.click(modalClose);

    expect(screen.queryByTestId("report-reason-modal")).not.toBeInTheDocument();
  });

  it("RequiredText가 신고 사유 라벨에 표시됩니다", () => {
    renderWithToastProvider();

    expect(screen.getByText("신고 사유")).toBeInTheDocument();
    expect(screen.getByTestId("required-text")).toBeInTheDocument();
  });

  it("모든 주요 요소가 함께 렌더링됩니다", () => {
    renderWithToastProvider();

    // DetailHeader
    expect(screen.getByTestId("detail-header")).toBeInTheDocument();

    // 신고 사유 선택 버튼
    expect(screen.getByText("신고 사유를 선택해 주세요.")).toBeInTheDocument();

    // InputField
    expect(screen.getByLabelText("신고 내용 (선택)")).toBeInTheDocument();

    // 제출 버튼
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
});
