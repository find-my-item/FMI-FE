import { render, screen } from "@testing-library/react";
import NoticeDetail from "./page";
import { noticeListObject } from "../_constant/noticeListObject";

describe("공지사항 상세 페이지 ID 일치 테스트", () => {
  it("URL의 동적 라우팅 ID와 상세 페이지에서 사용하는 ID가 일치해야 한다.", async () => {
    const testNotice = noticeListObject[0];

    const mockParams = Promise.resolve({
      id: testNotice.id.toString(),
    });

    const component = await NoticeDetail({ params: mockParams });
    render(component);

    const titleElement = screen.getByText(testNotice.title);
    expect(titleElement).toBeInTheDocument();
  });
});
