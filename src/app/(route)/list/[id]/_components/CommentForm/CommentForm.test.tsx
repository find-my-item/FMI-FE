import { render, screen } from "@testing-library/react";
import CommentForm from "./CommentForm";

describe("댓글 폼 테스트", () => {
  it("댓글 폼이 렌더링되어야 한다.", () => {
    render(<CommentForm />);

    const commentFormElement = screen.getByRole("form", { name: "댓글 입력 폼" });
    expect(commentFormElement).toBeInTheDocument();
  });

  it("이미지 추가 버튼이 렌더링되어야 한다.", () => {
    render(<CommentForm />);

    const commentInputElement = screen.getByRole("button", { name: "이미지 추가" });
    expect(commentInputElement).toBeInTheDocument();
  });

  it("댓글 전송 버튼이 렌더링되어야 한다.", () => {
    render(<CommentForm />);

    const commentButtonElement = screen.getByRole("button", { name: "댓글 전송" });
    expect(commentButtonElement).toBeInTheDocument();
  });

  it("댓글 입력 필드가 렌더링되어야 한다.", () => {
    render(<CommentForm />);

    const commentInputElement = screen.getByRole("textbox", { name: "댓글 입력" });
    expect(commentInputElement).toBeInTheDocument();
  });
});
