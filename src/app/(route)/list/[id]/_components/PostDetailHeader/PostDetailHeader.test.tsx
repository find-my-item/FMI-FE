import { render, screen } from "@testing-library/react";
import PostDetailHeader from "./PostDetailHeader";

describe("상세페이지 상단 헤더", () => {
  it("상세페이지 헤더가 렌더링되어야 한다.", () => {
    render(<PostDetailHeader />);

    const postDetailHeaderElement = screen.getByLabelText("상세페이지 유저 정보");
    expect(postDetailHeaderElement).toBeInTheDocument();
  });

  it("상세페이지 닉네임이 렌더링되어야 한다.", () => {
    render(<PostDetailHeader />);

    const postDetailHeaderElement = screen.getByText("글자확인용임시닉네임");
    expect(postDetailHeaderElement).toBeInTheDocument();
  });

  it("상세페이지 채팅하러가기 버튼이 렌더링되어야 한다.", () => {
    render(<PostDetailHeader />);

    const postDetailHeaderElement = screen.getByRole("button", { name: "채팅하러 가기" });
    expect(postDetailHeaderElement).toBeInTheDocument();
  });
});
