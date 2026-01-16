import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatRoomHeader from "./ChatRoomHeader";

const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
}));

jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

jest.mock("@/components/common", () => ({
  Icon: ({ name, ...rest }: any) => <span data-testid={`icon-${name}`} {...rest} />,
}));

jest.mock("../ChatChip/ChatChip", () => ({
  __esModule: true,
  default: ({ postMode }: { postMode: "lost" | "find" }) => (
    <div data-testid="chat-chip">{postMode}</div>
  ),
}));

jest.mock("../ChatRoomHeaderInfoButton/ChatRoomHeaderInfoButton", () => ({
  __esModule: true,
  default: () => <div data-testid="chat-room-header-info-button">InfoButton</div>,
}));

describe("ChatRoomHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("뒤로가기 버튼이 렌더링되고 클릭 시 router.back()이 호출됩니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeader postMode="find" />);

    const backButton = screen.getByRole("button", { name: "뒤로 가기 버튼" });
    expect(backButton).toBeInTheDocument();
    expect(screen.getByTestId("icon-ArrowLeftSmall")).toBeInTheDocument();

    await user.click(backButton);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("사용자 닉네임이 렌더링됩니다", () => {
    render(<ChatRoomHeader postMode="find" />);

    expect(screen.getByText("사용자 닉네임")).toBeInTheDocument();
  });

  it("게시글 썸네일 이미지가 렌더링됩니다", () => {
    render(<ChatRoomHeader postMode="find" />);

    const image = screen.getByAltText("게시글 썸네일 이미지");
    expect(image).toBeInTheDocument();
  });

  it("ChatChip이 postMode와 함께 렌더링됩니다", () => {
    render(<ChatRoomHeader postMode="find" />);

    const chatChip = screen.getByTestId("chat-chip");
    expect(chatChip).toBeInTheDocument();
    expect(chatChip).toHaveTextContent("find");
  });

  it("postMode가 lost일 때 ChatChip에 lost가 전달됩니다", () => {
    render(<ChatRoomHeader postMode="lost" />);

    const chatChip = screen.getByTestId("chat-chip");
    expect(chatChip).toHaveTextContent("lost");
  });

  it("게시글명이 렌더링됩니다", () => {
    render(<ChatRoomHeader postMode="find" />);

    expect(
      screen.getByText("여기에 게시글명이 표기됩니다 여기에 게시글명이 표기됩니다. 여기에")
    ).toBeInTheDocument();
  });

  it("위치 정보가 렌더링됩니다", () => {
    render(<ChatRoomHeader postMode="find" />);

    expect(screen.getByText("서울시 중구 회현동")).toBeInTheDocument();
  });

  it("ChatRoomHeaderInfoButton이 렌더링됩니다", () => {
    render(<ChatRoomHeader postMode="find" />);

    expect(screen.getByTestId("chat-room-header-info-button")).toBeInTheDocument();
  });

  it("모든 주요 요소가 함께 렌더링됩니다", () => {
    render(<ChatRoomHeader postMode="find" />);

    // 뒤로가기 버튼
    expect(screen.getByRole("button", { name: "뒤로 가기 버튼" })).toBeInTheDocument();
    expect(screen.getByTestId("icon-ArrowLeftSmall")).toBeInTheDocument();

    // 사용자 닉네임
    expect(screen.getByText("사용자 닉네임")).toBeInTheDocument();

    // 정보 버튼
    expect(screen.getByTestId("chat-room-header-info-button")).toBeInTheDocument();

    // 게시글 썸네일
    expect(screen.getByAltText("게시글 썸네일 이미지")).toBeInTheDocument();

    // ChatChip
    expect(screen.getByTestId("chat-chip")).toBeInTheDocument();

    // 게시글명
    expect(
      screen.getByText("여기에 게시글명이 표기됩니다 여기에 게시글명이 표기됩니다. 여기에")
    ).toBeInTheDocument();

    // 위치 정보
    expect(screen.getByText("서울시 중구 회현동")).toBeInTheDocument();
  });
});
