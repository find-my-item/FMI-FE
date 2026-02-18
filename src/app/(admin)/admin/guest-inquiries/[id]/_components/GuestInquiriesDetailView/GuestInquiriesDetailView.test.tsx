import { render, screen, fireEvent } from "@testing-library/react";
import GuestInquiriesDetailView from "./GuestInquiriesDetailView";

jest.mock("@/components/common", () => ({
  Button: ({ children, onClick, ...rest }: any) => (
    <button type="button" onClick={onClick} {...rest}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/state", () => ({
  LoadingState: () => <div data-testid="loading">loading</div>,
}));

jest.mock("@/app/(admin)/admin/_components", () => ({
  AdminDetailSection: ({ data }: any) => (
    <div data-testid="detail-section" data-username={data?.userName} />
  ),
}));

jest.mock("@/mock/data", () => ({
  MOCK_GUEST_INQUIRY_DETAIL_DATA: {
    userName: "admin@gmail.com",
  },
}));

const addToastMock = jest.fn();
jest.mock("@/context/ToastContext", () => ({
  useToast: () => ({ addToast: addToastMock }),
}));

describe("GuestInquiriesDetailView", () => {
  beforeEach(() => {
    addToastMock.mockClear();
  });

  it("상세 섹션 렌더", () => {
    render(<GuestInquiriesDetailView />);

    expect(screen.getByTestId("detail-section")).toBeInTheDocument();
    expect(screen.getByTestId("detail-section")).toHaveAttribute(
      "data-username",
      "admin@gmail.com"
    );
    expect(screen.getByRole("button", { name: "이메일 복사하기" })).toBeInTheDocument();
  });

  it("이메일 복사 성공 시 success 토스트", () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<GuestInquiriesDetailView />);

    fireEvent.click(screen.getByRole("button", { name: "이메일 복사하기" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("admin@gmail.com");
    expect(addToastMock).toHaveBeenCalledWith("이메일을 클립보드에 복사했어요", "success");
  });

  it("이메일 복사 실패 시 error 토스트", () => {
    const writeText = jest.fn(() => {
      throw new Error("fail");
    });
    Object.assign(navigator, { clipboard: { writeText } });

    render(<GuestInquiriesDetailView />);

    fireEvent.click(screen.getByRole("button", { name: "이메일 복사하기" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(addToastMock).toHaveBeenCalledWith("이메일 복사에 실패했어요", "error");
  });
});
