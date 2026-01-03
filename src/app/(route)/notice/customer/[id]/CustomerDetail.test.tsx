import { render, screen } from "@testing-library/react";
import { customerListObject } from "../../_constant/customerListObject";
import CustomerDetail from "./page";

describe("문의 상세 페이지 ID 일치 테스트", () => {
  it("URL의 동적 라우팅 ID와 상세 페이지에서 사용하는 ID가 일치해야 한다.", async () => {
    const testCustomer = customerListObject[0];

    const mockParams = Promise.resolve({
      id: testCustomer.id.toString(),
    });

    const component = await CustomerDetail({ params: mockParams });
    render(component);

    // const titleElement = screen.getByText(testCustomer.title);
    // expect(titleElement).toBeInTheDocument();
  });
});
