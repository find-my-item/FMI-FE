import { render, screen } from "@testing-library/react";
import Caption from "./Caption"; // 테스트할 Caption 컴포넌트
import "@testing-library/jest-dom";

describe("Caption 컴포넌트", () => {
  // 테스트 1
  it("isSuccess가 true일 때 successMessage를 'text-system-success' 클래스와 함께 렌더링하는지 확인", () => {
    const successText = "성공했습니다!";
    render(
      <Caption isSuccess={true} successMessage={successText} errorMessage="에러" rule="규칙" />
    );

    const pElement = screen.getByText(successText);
    expect(pElement).toBeInTheDocument();

    expect(pElement).toHaveClass("text-system-success");

    expect(screen.queryByText("에러")).not.toBeInTheDocument();
    expect(screen.queryByText("규칙")).not.toBeInTheDocument();
  });

  // 테스트 2
  it("isSuccess가 false이고 hasError가 true일 때 errorMessage를 'text-system-warning' 클래스와 함께 렌더링한다", () => {
    const errorText = "필수 항목입니다.";
    render(<Caption isSuccess={false} hasError={true} errorMessage={errorText} rule="규칙" />);

    const pElement = screen.getByText(errorText);
    expect(pElement).toBeInTheDocument();

    expect(pElement).toHaveClass("text-system-warning");

    expect(screen.queryByText("규칙")).not.toBeInTheDocument();
  });

  // 테스트 3
  it("isSuccess와 hasError가 모두 false일 때 rule 메시지를 'text-fg-layout-body-default' 클래스와 함께 렌더링한다", () => {
    const ruleText = "비밀번호는 8자 이상입니다.";
    render(<Caption isSuccess={false} hasError={false} errorMessage="에러" rule={ruleText} />);

    const pElement = screen.getByText(ruleText);
    expect(pElement).toBeInTheDocument();

    expect(pElement).toHaveClass("text-fg-layout-body-default");

    expect(screen.queryByText("에러")).not.toBeInTheDocument();
  });

  // 테스트 4
  it("props가 제공되지 않으면 'Rule' 상태가 되며, 텍스트가 없어 빈 <p> 태그를 렌더링한다", () => {
    const { container } = render(<Caption />);

    const pElement = container.querySelector("p");
    expect(pElement).toBeInTheDocument();

    expect(pElement).toHaveClass("text-fg-layout-body-default");

    expect(pElement).toBeEmptyDOMElement();
  });

  // 테스트 5
  it("isSuccess가 true이지만 successMessage가 없으면, 'text-system-success' 클래스를 가진 빈 <p> 태그를 렌더링한다", () => {
    const { container } = render(<Caption isSuccess={true} />);

    const pElement = container.querySelector("p");
    expect(pElement).toBeInTheDocument();

    expect(pElement).toHaveClass("text-system-success");

    expect(pElement).toBeEmptyDOMElement();
  });
});
