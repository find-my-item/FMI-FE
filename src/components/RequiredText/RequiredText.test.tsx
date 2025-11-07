import { render } from "@testing-library/react";
import RequiredText from "./RequiredText";

describe("RequiredText", () => {
  it("* 텍스트가 렌더됩니다.", () => {
    const { getByText } = render(<RequiredText />);
    expect(getByText("*"));
  });

  it("text-flatGreen-500 스타일이 적용됩니다.", () => {
    const { getByText } = render(<RequiredText />);
    expect(getByText("*")).toHaveClass("text-flatGreen-500");
  });

  it("className이 전달됩니다.", () => {
    const { getByText } = render(<RequiredText className="test" />);
    expect(getByText("*")).toHaveClass("test");
  });
});
