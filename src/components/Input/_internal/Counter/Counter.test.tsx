import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "./Counter";

describe("Counter 컴포넌트", () => {
  test("maxLength와 isLength가 제공되면 'isLength/maxLength'형식으로 렌더링 하는지 확인", () => {
    render(<Counter isLength={5} maxLength={100} />);

    const counterTest = screen.getByText("5/100");
    expect(counterTest).toBeInTheDocument();
  });

  test("isLength가 0일 때 '0/maxLength'형식으로 렌더링 하는지 확인", () => {
    render(<Counter isLength={0} maxLength={30} />);

    const counterTest = screen.getByText("0/30");
    expect(counterTest).toBeInTheDocument();
  });

  test("maxLength props가 제공되지 않으면 아무것도 렌더링 하지 않는지 확인", () => {
    const { container } = render(<Counter isLength={5} />);

    expect(container).toBeEmptyDOMElement();
  });
});
