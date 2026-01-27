import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabContents from "./TabContents";
import { MOCK_USER_PROFILE_DATA } from "@/mock/data";

jest.mock("@/components/domain", () => ({
  PostListItem: () => <div data-testid="list-item">PostListItem</div>,
}));

jest.mock("../_internal/CommentItem/CommentItem", () => () => (
  <li data-testid="comment-item">CommentItem</li>
));

jest.mock("../_internal/EmptyUI/EmptyUI", () => () => <div>EmptyUI</div>);

describe("TabContents", () => {
  it("초기 상태에서는 게시글 탭 콘텐츠가 표시되어야 합니다", () => {
    render(
      <TabContents selectedTab="post" query={{ isLoading: false, data: MOCK_USER_PROFILE_DATA }} />
    );

    expect(screen.queryAllByTestId("list-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("comment-item")).toHaveLength(0);
  });

  it("댓글 탭 선택 시 댓글 콘텐츠가 표시되어야 합니다", () => {
    render(
      <TabContents
        selectedTab="comment"
        query={{ isLoading: false, data: MOCK_USER_PROFILE_DATA }}
      />
    );

    expect(screen.queryAllByTestId("comment-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("list-item")).toHaveLength(0);
  });

  it("즐겨찾기 탭 선택 시 즐겨찾기 콘텐츠가 표시되어야 합니다", () => {
    render(
      <TabContents
        selectedTab="favorite"
        query={{ isLoading: false, data: MOCK_USER_PROFILE_DATA }}
      />
    );

    expect(screen.queryAllByTestId("list-item").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("comment-item")).toHaveLength(0);
  });
});
