import { render, screen } from "@testing-library/react";
import AdminReportsCommentSection from "./AdminReportsCommentSection";
import { MOCK_COMMENT_DATA } from "@/mock/data";

jest.mock("@/components/domain", () => ({
  ReadOnlyCommentItem: ({ data }: any) => (
    <li data-testid="comment-item" data-content={data.content}>
      {data.content}
    </li>
  ),
}));

describe("AdminReportsCommentSection", () => {
  it("댓글 섹션 렌더 및 aria 연결", () => {
    render(<AdminReportsCommentSection />);

    const section = screen.getByRole("region", { name: "댓글" });
    expect(section).toBeInTheDocument();

    expect(screen.getByText("댓글")).toBeInTheDocument();
  });

  it("MOCK_COMMENT_DATA 개수만큼 렌더", () => {
    render(<AdminReportsCommentSection />);

    const items = screen.getAllByTestId("comment-item");
    expect(items.length).toBe(MOCK_COMMENT_DATA.length);

    MOCK_COMMENT_DATA.forEach((item, index) => {
      expect(items[index]).toHaveTextContent(item.content);
    });
  });
});
