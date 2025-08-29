import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("버튼이 label을 표시한다", () => {
  render(<Button label="클릭" />);
  expect(screen.getByText("클릭")).toBeInTheDocument();
});
