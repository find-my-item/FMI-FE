import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TabContents from "./TabContents";

jest.mock("@/components/domain", () => ({
  Tab: ({ tabs, selected, onValueChange }: any) => (
    <div role="tablist" aria-label="프로필 탭">
      {tabs.map((t: any) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={selected === t.key}
          onClick={() => onValueChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  ),
}));

jest.mock("@/app/(route)/list/_components/ListItem/ListItem", () => () => (
  <div data-testid="list-item">ListItem</div>
));

jest.mock("../_internal/CommentItem/CommentItem", () => () => (
  <div data-testid="comment-item">CommentItem</div>
));

describe("TabContents", () => {
  it("초기 상태에서는 게시글 탭 콘텐츠가 표시되어야 합니다", () => {
    render(<TabContents />);

    const tablist = screen.getByRole("tablist", { name: "프로필 탭" });
    const tabs = within(tablist).getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    expect(screen.queryAllByTestId("list-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("comment-item")).toHaveLength(0);
  });

  it("댓글 탭 클릭 시 댓글 콘텐츠가 표시되어야 합니다", async () => {
    render(<TabContents />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("tab", { name: "댓글" }));
    expect(screen.getByRole("tab", { name: "댓글" })).toHaveAttribute("aria-selected", "true");

    expect(screen.queryAllByTestId("comment-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("list-item")).toHaveLength(0);
  });

  it("즐겨찾기 탭 클릭 시 즐겨찾기 콘텐츠가 표시되어야 합니다", async () => {
    render(<TabContents />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("tab", { name: "즐겨찾기" }));
    expect(screen.getByRole("tab", { name: "즐겨찾기" })).toHaveAttribute("aria-selected", "true");

    expect(screen.queryAllByTestId("list-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("comment-item")).toHaveLength(0);
  });
});
