import { render, screen } from "@testing-library/react";
import CustomerList from "../_components/CustomerList";
import { customerListObject } from "../_constant/customerListObject";

describe("문의 리스트 테스트", () => {
  it("문의 데이터 제목이 화면에 렌더링 되어야 한다.", () => {
    render(<CustomerList />);

    customerListObject.forEach((notice) => {
      const titleElement = screen.getByText(notice.title);
      expect(titleElement).toBeInTheDocument();
    });
  });
});
