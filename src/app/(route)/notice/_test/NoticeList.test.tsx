import { render, screen } from "@testing-library/react";
import Notice from "../page";
import { noticeListObject } from "../_constant/noticeListObject";

describe("공지사항 리스트 테스트", () => {
  it("목업 데이터 제목이 화면에 렌더링 되어야 한다.", () => {
    render(<Notice />);

    noticeListObject.forEach((notice) => {
      const titleElement = screen.getByText(notice.title);
      expect(titleElement).toBeInTheDocument();
    });
  });
});
