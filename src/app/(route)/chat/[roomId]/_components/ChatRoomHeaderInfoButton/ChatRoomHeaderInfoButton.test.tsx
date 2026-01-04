import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatRoomHeaderInfoButton from "./ChatRoomHeaderInfoButton";

const mockPush = jest.fn();
const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, back: mockBack }),
}));

jest.mock("@/components/common", () => ({
  Icon: ({ name, ...rest }: any) => <span data-testid={`icon-${name}`} {...rest} />,
  ConfirmModal: ({ isOpen, onConfirm, onCancel, title, content }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="confirm-modal">
        <div>{title}</div>
        <div>{content}</div>
        <button onClick={onConfirm} data-testid="modal-confirm">
          확인
        </button>
        <button onClick={onCancel} data-testid="modal-cancel">
          취소
        </button>
      </div>
    );
  },
}));

jest.mock("@/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("ChatRoomHeaderInfoButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정보 버튼이 렌더링됩니다", () => {
    render(<ChatRoomHeaderInfoButton />);

    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    expect(infoButton).toBeInTheDocument();
    expect(screen.getByTestId("icon-Information")).toBeInTheDocument();
  });

  it("정보 버튼 클릭 시 메뉴가 열립니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    await user.click(infoButton);

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "차단, 신고하기" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "채팅방 나가기" })).toBeInTheDocument();
  });

  it("메뉴 옵션들이 올바르게 렌더링됩니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    await user.click(infoButton);

    expect(screen.getByText("차단, 신고하기")).toBeInTheDocument();
    expect(screen.getByText("채팅방 나가기")).toBeInTheDocument();
  });

  it("차단, 신고하기 클릭 시 router.push가 호출됩니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    await user.click(infoButton);

    const reportButton = screen.getByRole("button", { name: "차단, 신고하기" });
    await user.click(reportButton);

    expect(mockPush).toHaveBeenCalledWith("/chat/1/report");
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it("채팅방 나가기 클릭 시 모달이 열립니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    await user.click(infoButton);

    const leaveButton = screen.getByRole("button", { name: "채팅방 나가기" });
    await user.click(leaveButton);

    expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
    expect(screen.getByText("채팅방을 나가시겠어요?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수 없어요, 채팅방에서 나가시겠어요?"
      )
    ).toBeInTheDocument();
  });

  it("모달에서 확인 클릭 시 router.back()이 호출됩니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    // 메뉴 열기
    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    await user.click(infoButton);

    // 채팅방 나가기 클릭하여 모달 열기
    const leaveButton = screen.getByRole("button", { name: "채팅방 나가기" });
    await user.click(leaveButton);

    // 모달에서 확인 클릭
    const confirmButton = screen.getByTestId("modal-confirm");
    await user.click(confirmButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("모달에서 취소 클릭 시 모달이 닫힙니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    // 메뉴 열기
    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    await user.click(infoButton);

    // 채팅방 나가기 클릭하여 모달 열기
    const leaveButton = screen.getByRole("button", { name: "채팅방 나가기" });
    await user.click(leaveButton);

    expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();

    // 모달에서 취소 클릭
    const cancelButton = screen.getByTestId("modal-cancel");
    await user.click(cancelButton);

    expect(screen.queryByTestId("confirm-modal")).not.toBeInTheDocument();
  });

  it("외부 클릭 시 메뉴가 닫힙니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    // 메뉴 열기
    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    await user.click(infoButton);

    expect(screen.getByRole("menu")).toBeInTheDocument();

    // 외부 클릭 시뮬레이션
    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("메뉴 내부 클릭 시 메뉴가 닫히지 않습니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    // 메뉴 열기
    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });
    await user.click(infoButton);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    // 메뉴 내부 클릭
    fireEvent.mouseDown(menu);

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("정보 버튼을 다시 클릭하면 메뉴가 닫힙니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeaderInfoButton />);

    const infoButton = screen.getByRole("button", { name: "채팅방 메뉴 열기 버튼" });

    // 메뉴 열기
    await user.click(infoButton);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // 메뉴 닫기
    await user.click(infoButton);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
