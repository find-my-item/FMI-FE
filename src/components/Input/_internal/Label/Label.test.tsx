import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Label from "./Label";

jest.mock("@/components", () => ({
  __esModule: true,
  RequiredText: () => <span data-testid="required-star">*</span>,
}));

describe("Label 컴포넌트", () => {
  // 테스트 1
  test("label 텍스트와 htmlFor 속성을 올바르게 렌더링 하는지 확인", () => {
    render(<Label name="email" label="이메일 주소" />);

    const labelElement = screen.getByText("이메일 주소");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "email");
  });

  // 테스트 2
  test("required prop이 true일 때 RequiredText(Mock)를 렌더링하는지 확인", () => {
    render(<Label name="username" label="사용자명" required={true} />);

    expect(screen.getByText("사용자명")).toBeInTheDocument();
    expect(screen.getByTestId("required-star")).toBeInTheDocument();
  });

  // 테스트 3
  test("required prop이 false이거나 없을 때 RequiredText(Mock)를 렌더링하지 않는지 확인", () => {
    const { rerender } = render(<Label name="bio" label="소개" />);

    expect(screen.queryByTestId("required-star")).not.toBeInTheDocument();
    rerender(<Label name="bio" label="소개" required={false} />);
    expect(screen.queryByTestId("required-star")).not.toBeInTheDocument();
  });

  // 테스트 4
  test("className과 같은 추가 HTML 속성을 올바르게 전달하는지 확인", () => {
    render(<Label name="custom" label="커스텀 라벨" className="my-custom-class" />);

    const labelElement = screen.getByText("커스텀 라벨");
    expect(labelElement).toHaveClass("my-custom-class");
  });
});
