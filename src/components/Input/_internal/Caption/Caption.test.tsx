import { render, screen } from "@testing-library/react";
import Caption from "./Caption"; // 테스트할 Caption 컴포넌트
import "@testing-library/jest-dom";

describe("Caption 컴포넌트", () => {
  // 테스트 1: 성공 상태 (isSuccess = true)
  it("isSuccess가 true일 때 successMessage를 'text-system-success' 클래스와 함께 렌더링한다", () => {
    const successText = "성공했습니다!";
    render(
      <Caption isSuccess={true} successMessage={successText} errorMessage="에러" rule="규칙" />
    );

    // 1. 텍스트 확인
    const pElement = screen.getByText(successText);
    expect(pElement).toBeInTheDocument();

    // 2. 클래스(색상) 확인
    expect(pElement).toHaveClass("text-system-success");

    // 3. 다른 메시지들은 렌더링되지 않았는지 확인
    expect(screen.queryByText("에러")).not.toBeInTheDocument();
    expect(screen.queryByText("규칙")).not.toBeInTheDocument();
  });

  // 테스트 2: 에러 상태 (isSuccess = false, hasError = true)
  it("isSuccess가 false이고 hasError가 true일 때 errorMessage를 'text-system-warning' 클래스와 함께 렌더링한다", () => {
    const errorText = "필수 항목입니다.";
    render(<Caption isSuccess={false} hasError={true} errorMessage={errorText} rule="규칙" />);

    // 1. 텍스트 확인
    const pElement = screen.getByText(errorText);
    expect(pElement).toBeInTheDocument();

    // 2. 클래스(색상) 확인
    expect(pElement).toHaveClass("text-system-warning");

    // 3. rule 메시지는 렌더링되지 않았는지 확인
    expect(screen.queryByText("규칙")).not.toBeInTheDocument();
  });

  // 테스트 3: 기본 규칙 상태 (isSuccess = false, hasError = false)
  it("isSuccess와 hasError가 모두 false일 때 rule 메시지를 'text-fg-layout-body-default' 클래스와 함께 렌더링한다", () => {
    const ruleText = "비밀번호는 8자 이상입니다.";
    render(<Caption isSuccess={false} hasError={false} errorMessage="에러" rule={ruleText} />);

    // 1. 텍스트 확인
    const pElement = screen.getByText(ruleText);
    expect(pElement).toBeInTheDocument();

    // 2. 클래스(색상) 확인
    expect(pElement).toHaveClass("text-fg-layout-body-default");

    // 3. 에러 메시지는 렌더링되지 않았는지 확인
    expect(screen.queryByText("에러")).not.toBeInTheDocument();
  });

  // 테스트 4: props가 아무것도 없을 때 (기본 상태)
  it("props가 제공되지 않으면 'Rule' 상태가 되며, 텍스트가 없어 빈 <p> 태그를 렌더링한다", () => {
    // text가 undefined이므로, getByText로 찾을 수 없습니다.
    const { container } = render(<Caption />);

    // 1. <p> 태그가 렌더링되었는지 확인
    const pElement = container.querySelector("p");
    expect(pElement).toBeInTheDocument();

    // 2. 'Rule' 상태의 클래스(색상)를 가졌는지 확인
    expect(pElement).toHaveClass("text-fg-layout-body-default");

    // 3. 텍스트 내용은 비어있는지 확인
    expect(pElement).toBeEmptyDOMElement();
  });

  // 테스트 5: 상태는 맞지만 텍스트가 없는 경우
  it("isSuccess가 true이지만 successMessage가 없으면, 'text-system-success' 클래스를 가진 빈 <p> 태그를 렌더링한다", () => {
    const { container } = render(<Caption isSuccess={true} />);

    // 1. <p> 태그가 렌더링되었는지 확인
    const pElement = container.querySelector("p");
    expect(pElement).toBeInTheDocument();

    // 2. 'Success' 상태의 클래스(색상)를 가졌는지 확인
    expect(pElement).toHaveClass("text-system-success");

    // 3. 텍스트 내용은 비어있는지 확인
    expect(pElement).toBeEmptyDOMElement();
  });
});
