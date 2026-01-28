import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatRoomHeader from "./ChatRoomHeader";
import { ChatRoomResponse } from "@/api/fetch/chatRoom/types/ChatRoomType";

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
  default: ({ postMode }: { postMode: "FOUND" | "LOST" }) => (
    <div data-testid="chat-chip">{postMode}</div>
  ),
}));

jest.mock("../ChatRoomHeaderInfoButton/ChatRoomHeaderInfoButton", () => ({
  __esModule: true,
  default: () => <div data-testid="chat-room-header-info-button">InfoButton</div>,
}));

const mockChatRoomFound: ChatRoomResponse = {
  roomId: 1,
  opponentUser: {
    opponentUserId: 2,
    nickname: "사용자 닉네임",
    profileImageUrl: "https://via.placeholder.com/40",
    emailVerified: true,
  },
  postInfo: {
    postId: 1,
    postType: "FOUND",
    title: "여기에 게시글명이 표기됩니다 여기에 게시글명이 표기됩니다. 여기에",
    address: "서울시 중구 회현동",
    thumbnailUrl: "https://via.placeholder.com/40",
  },
};

const mockChatRoomLost: ChatRoomResponse = {
  roomId: 2,
  opponentUser: {
    opponentUserId: 3,
    nickname: "다른 사용자",
    profileImageUrl: "https://via.placeholder.com/40",
    emailVerified: true,
  },
  postInfo: {
    postId: 2,
    postType: "LOST",
    title: "분실물 게시글 제목입니다",
    address: "서울시 강남구 역삼동",
    thumbnailUrl: "https://via.placeholder.com/40",
  },
};

describe("ChatRoomHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("chatRoom이 undefined일 때 null을 반환합니다", () => {
    const { container } = render(<ChatRoomHeader chatRoom={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("뒤로가기 버튼이 렌더링되고 클릭 시 router.back()이 호출됩니다", async () => {
    const user = userEvent.setup();
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

    const backButton = screen.getByRole("button", { name: "뒤로 가기 버튼" });
    expect(backButton).toBeInTheDocument();
    expect(screen.getByTestId("icon-ArrowLeftSmall")).toBeInTheDocument();

    await user.click(backButton);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("사용자 닉네임이 렌더링됩니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

    expect(screen.getByText("사용자 닉네임")).toBeInTheDocument();
  });

  it("게시글 썸네일 이미지가 렌더링됩니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

    const image = screen.getByAltText("게시글 썸네일 이미지");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockChatRoomFound.postInfo.thumbnailUrl);
  });

  it("ChatChip이 postType과 함께 렌더링됩니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

    const chatChip = screen.getByTestId("chat-chip");
    expect(chatChip).toBeInTheDocument();
    expect(chatChip).toHaveTextContent("FOUND");
  });

  it("postType이 LOST일 때 ChatChip에 LOST가 전달됩니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomLost} />);

    const chatChip = screen.getByTestId("chat-chip");
    expect(chatChip).toHaveTextContent("LOST");
  });

  it("게시글명이 렌더링됩니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

    expect(
      screen.getByText("여기에 게시글명이 표기됩니다 여기에 게시글명이 표기됩니다. 여기에")
    ).toBeInTheDocument();
  });

  it("위치 정보가 렌더링됩니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

    expect(screen.getByText("서울시 중구 회현동")).toBeInTheDocument();
  });

  it("ChatRoomHeaderInfoButton이 렌더링됩니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

    expect(screen.getByTestId("chat-room-header-info-button")).toBeInTheDocument();
  });

  it("게시글 링크가 올바른 href를 가집니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/list/${mockChatRoomFound.postInfo.postId}`);
  });

  it("썸네일이 없을 때 MOCK_IMAGES를 사용합니다", () => {
    const chatRoomWithoutThumbnail: ChatRoomResponse = {
      ...mockChatRoomFound,
      postInfo: {
        ...mockChatRoomFound.postInfo,
        thumbnailUrl: "",
      },
    };

    render(<ChatRoomHeader chatRoom={chatRoomWithoutThumbnail} />);

    const image = screen.getByAltText("게시글 썸네일 이미지");
    expect(image).toBeInTheDocument();
  });

  it("모든 주요 요소가 함께 렌더링됩니다", () => {
    render(<ChatRoomHeader chatRoom={mockChatRoomFound} />);

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
