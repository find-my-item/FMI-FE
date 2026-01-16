import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatRoomMain from "./ChatRoomMain";
import { ChatRoomProvider } from "@/providers/ChatRoomProvider";
import { MockChatDataType } from "@/app/(route)/chat/_types/MockChatDataType";

jest.mock("./useChatScroll", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./internal", () => ({
  ChatBox: ({ chat, nextSender, lastChat }: any) => (
    <div
      data-testid="chat-box"
      data-sender={chat.sender}
      data-next-sender={nextSender ?? "undefined"}
      data-last-chat={lastChat}
    >
      {chat.text && <div data-testid="chat-text">{chat.text}</div>}
      <div data-testid="chat-time">{chat.time}</div>
      {chat.images && <div data-testid="chat-images">{chat.images.length} images</div>}
    </div>
  ),
}));

const renderWithProvider = (initialChats: MockChatDataType[] = []) => {
  return render(
    <ChatRoomProvider initialChats={initialChats}>
      <ChatRoomMain />
    </ChatRoomProvider>
  );
};

describe("ChatRoomMain", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("스크린 리더용 제목이 렌더링됩니다", () => {
    renderWithProvider();

    const heading = screen.getByRole("heading", { name: "채팅 표시 화면" });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("sr-only");
  });

  it("날짜 표시 영역이 렌더링됩니다", () => {
    renderWithProvider();

    expect(screen.getByText("2025.11.07 금요일")).toBeInTheDocument();
  });

  it("빈 chats 배열일 때 ChatBox가 렌더링되지 않습니다", () => {
    renderWithProvider([]);

    expect(screen.queryAllByTestId("chat-box")).toHaveLength(0);
  });

  it("chats가 있을 때 ChatBox들이 렌더링됩니다", () => {
    const mockChats: MockChatDataType[] = [
      { sender: "me", text: "안녕하세요", time: "14:00" },
      { sender: "other", text: "반갑습니다", time: "14:01" },
    ];

    renderWithProvider(mockChats);

    const chatBoxes = screen.getAllByTestId("chat-box");
    expect(chatBoxes).toHaveLength(2);
  });

  it("ChatBox에 올바른 props가 전달됩니다", () => {
    const mockChats: MockChatDataType[] = [
      { sender: "me", text: "첫 번째 메시지", time: "14:00" },
      { sender: "other", text: "두 번째 메시지", time: "14:01" },
    ];

    renderWithProvider(mockChats);

    const chatBoxes = screen.getAllByTestId("chat-box");

    // 첫 번째 ChatBox (i=0, 마지막 채팅, nextSender는 undefined)
    expect(chatBoxes[0]).toHaveAttribute("data-sender", "me");
    expect(chatBoxes[0]).toHaveAttribute("data-last-chat", "true");
    expect(chatBoxes[0]).toHaveAttribute("data-next-sender", "undefined");

    // 두 번째 ChatBox (i=1, nextSender는 첫 번째 채팅의 sender)
    expect(chatBoxes[1]).toHaveAttribute("data-sender", "other");
    expect(chatBoxes[1]).toHaveAttribute("data-last-chat", "false");
    expect(chatBoxes[1]).toHaveAttribute("data-next-sender", "me");
  });

  it("ChatBox에 채팅 텍스트가 올바르게 전달됩니다", () => {
    const mockChats: MockChatDataType[] = [{ sender: "me", text: "테스트 메시지", time: "14:00" }];

    renderWithProvider(mockChats);

    expect(screen.getByText("테스트 메시지")).toBeInTheDocument();
  });

  it("ChatBox에 시간이 올바르게 전달됩니다", () => {
    const mockChats: MockChatDataType[] = [{ sender: "me", text: "메시지", time: "14:30" }];

    renderWithProvider(mockChats);

    expect(screen.getByText("14:30")).toBeInTheDocument();
  });

  it("이미지가 있는 채팅도 올바르게 렌더링됩니다", () => {
    const mockChats: MockChatDataType[] = [
      { sender: "me", text: "이미지 포함", time: "14:00", images: ["image1.jpg", "image2.jpg"] },
    ];

    renderWithProvider(mockChats);

    expect(screen.getByText("2 images")).toBeInTheDocument();
  });

  it("여러 채팅이 있을 때 모든 ChatBox가 렌더링됩니다", () => {
    const mockChats: MockChatDataType[] = [
      { sender: "me", text: "메시지 1", time: "14:00" },
      { sender: "other", text: "메시지 2", time: "14:01" },
      { sender: "me", text: "메시지 3", time: "14:02" },
      { sender: "other", text: "메시지 4", time: "14:03" },
    ];

    renderWithProvider(mockChats);

    const chatBoxes = screen.getAllByTestId("chat-box");
    expect(chatBoxes).toHaveLength(4);
  });

  it("연속된 같은 발신자의 채팅에서 nextSender가 올바르게 전달됩니다", () => {
    const mockChats: MockChatDataType[] = [
      { sender: "me", text: "첫 번째", time: "14:00" },
      { sender: "me", text: "두 번째", time: "14:01" },
      { sender: "other", text: "세 번째", time: "14:02" },
    ];

    renderWithProvider(mockChats);

    const chatBoxes = screen.getAllByTestId("chat-box");

    // 첫 번째 (i=0, 마지막 채팅, nextSender는 undefined)
    expect(chatBoxes[0]).toHaveAttribute("data-next-sender", "undefined");

    // 두 번째 (i=1, nextSender는 첫 번째 채팅의 sender)
    expect(chatBoxes[1]).toHaveAttribute("data-next-sender", "me");

    // 세 번째 (i=2, nextSender는 두 번째 채팅의 sender)
    expect(chatBoxes[2]).toHaveAttribute("data-next-sender", "me");
  });

  it("모든 주요 요소가 함께 렌더링됩니다", () => {
    const mockChats: MockChatDataType[] = [{ sender: "me", text: "테스트 메시지", time: "14:00" }];

    renderWithProvider(mockChats);

    // 스크린 리더용 제목
    expect(screen.getByRole("heading", { name: "채팅 표시 화면" })).toBeInTheDocument();

    // ChatBox
    expect(screen.getByTestId("chat-box")).toBeInTheDocument();
    expect(screen.getByText("테스트 메시지")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();

    // 날짜 표시
    expect(screen.getByText("2025.11.07 금요일")).toBeInTheDocument();
  });
});
