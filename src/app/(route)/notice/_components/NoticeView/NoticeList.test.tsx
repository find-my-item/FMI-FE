import { render, screen } from "@testing-library/react";
import { MOCK_NOTICE_ITEM } from "@/mock/data";
import NoticeList from "../NoticeList/NoticeList";

describe("공지사항 리스트 테스트", () => {
  it("목업 데이터 제목이 화면에 렌더링 되어야 한다.", () => {
    render(<NoticeList notices={[MOCK_NOTICE_ITEM]} />);

    const titleElement = screen.getByText(MOCK_NOTICE_ITEM.title);
    expect(titleElement).toBeInTheDocument();
  });
});
