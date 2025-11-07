import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentItem from "./CommentItem";

describe("CommentItem", () => {
  const comment = "여기에 댓글 내용이 표기됩니다";
  const date = "2025.11.02";

  it("댓글 텍스트가 표시되어야 합니다", () => {
    render(<CommentItem comment={comment} date={date} />);
    expect(screen.getByText(comment)).toBeInTheDocument();
  });

  it("날짜가 표시되어야 합니다", () => {
    render(<CommentItem comment={comment} date={date} />);
    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it("즐겨찾기(별) 카운트가 표시되어야 합니다", () => {
    render(<CommentItem comment={comment} date={date} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("한 줄 말줄임 클래스(line-clamp-1)가 적용되어야 합니다", () => {
    render(<CommentItem comment={comment} date={date} />);
    const commentEl = screen.getByText(comment);
    expect(commentEl).toHaveClass("line-clamp-1");
    expect(commentEl).toHaveClass("w-full");
  });
});
