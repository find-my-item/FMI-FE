import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabContents from "./TabContents";

jest.mock("@/app/(route)/list/_components/ListItem/ListItem", () => () => (
  <div data-testid="list-item">ListItem</div>
));

jest.mock("../_internal/CommentItem/CommentItem", () => () => (
  <li data-testid="comment-item">CommentItem</li>
));

describe("TabContents", () => {
  it("초기 상태에서는 게시글 탭 콘텐츠가 표시되어야 합니다", () => {
    render(<TabContents selectedTab="post" />);

    expect(screen.queryAllByTestId("list-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("comment-item")).toHaveLength(0);
  });

  it("댓글 탭 선택 시 댓글 콘텐츠가 표시되어야 합니다", () => {
    render(<TabContents selectedTab="comment" />);

    expect(screen.queryAllByTestId("comment-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("list-item")).toHaveLength(0);
  });

  it("즐겨찾기 탭 선택 시 즐겨찾기 콘텐츠가 표시되어야 합니다", () => {
    render(<TabContents selectedTab="favorite" />);

    expect(screen.queryAllByTestId("list-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("comment-item")).toHaveLength(0);
  });
});
