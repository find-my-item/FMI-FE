import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatItem from "./ChatItem";

jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("ChatItem", () => {
  it("링크가 올바른 href를 가지고 렌더링됩니다", () => {
    render(<ChatItem />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "chat/1");
  });

  it("유저 프로필 이미지와 게시글 썸네일 이미지가 렌더링됩니다", () => {
    render(<ChatItem />);

    const profileImage = screen.getByAltText("유저 프로필 이미지");
    const thumbnailImage = screen.getByAltText("게시글 썸네일 이미지");

    expect(profileImage).toBeInTheDocument();
    expect(thumbnailImage).toBeInTheDocument();
  });

  it("사용자 닉네임이 렌더링됩니다", () => {
    render(<ChatItem />);

    expect(screen.getByText("사용자 닉네임")).toBeInTheDocument();
  });

  it("위치와 시간 정보가 렌더링됩니다", () => {
    render(<ChatItem />);

    expect(screen.getByText("서울시 강남구 신사동 · 10분 전")).toBeInTheDocument();
  });

  it("메시지 미리보기가 렌더링됩니다", () => {
    render(<ChatItem />);

    expect(
      screen.getByText(
        "안녕하세요! 혹시 올리신 검정색 카드 지갑, 명동에서 습득하신 지갑이실까요? 혹시나 해서"
      )
    ).toBeInTheDocument();
  });

  it("알림 배지에 읽지 않은 메시지 개수가 표시됩니다", () => {
    render(<ChatItem />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("모든 주요 요소가 함께 렌더링됩니다", () => {
    render(<ChatItem />);

    // 링크
    expect(screen.getByRole("link")).toBeInTheDocument();

    // 이미지들
    expect(screen.getByAltText("유저 프로필 이미지")).toBeInTheDocument();
    expect(screen.getByAltText("게시글 썸네일 이미지")).toBeInTheDocument();

    // 텍스트 내용들
    expect(screen.getByText("사용자 닉네임")).toBeInTheDocument();
    expect(screen.getByText("서울시 강남구 신사동 · 10분 전")).toBeInTheDocument();
    expect(
      screen.getByText(
        "안녕하세요! 혹시 올리신 검정색 카드 지갑, 명동에서 습득하신 지갑이실까요? 혹시나 해서"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
