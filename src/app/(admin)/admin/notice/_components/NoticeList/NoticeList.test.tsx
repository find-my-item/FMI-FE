import { render, screen } from "@testing-library/react";
import NoticeList from "./NoticeList";
import { MOCK_NOTICE_LIST } from "@/mock/data";

jest.mock("../../../_components", () => ({
  AdminListItem: ({ link }: { link: string }) => <li data-testid="notice-item" data-link={link} />,
}));

describe("NoticeList", () => {
  it("섹션 렌더링", () => {
    render(<NoticeList />);
    expect(screen.getByRole("region", { name: "공지사항 목록" })).toBeInTheDocument();
  });

  it("공지사항 10개 렌더", () => {
    render(<NoticeList />);
    expect(screen.getAllByTestId("notice-item")).toHaveLength(10);
  });

  it("각 아이템 link 값 검증", () => {
    render(<NoticeList />);

    const items = screen.getAllByTestId("notice-item");

    items.forEach((item) => {
      expect(item).toHaveAttribute("data-link", `/notice/${MOCK_NOTICE_LIST.noticeId}`);
    });
  });
});
