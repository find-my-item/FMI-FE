import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon from "./Icon";

jest.mock("./index", () => ({
  Logo: (props: any) => <svg data-testid="mock-logo" {...props} />,
  Search: (props: any) => <svg data-testid="mock-search" {...props} />,
}));

describe("Icon 컴포넌트", () => {
  it("name으로 전달된 아이콘을 렌더링합니다.", () => {
    render(<Icon name="Logo" />);
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
  });

  it("size prop이 지정되지 않으면 기본값 24로 렌더링됩니다.", () => {
    render(<Icon name="Logo" />);
    const icon = screen.getByTestId("mock-logo");
    expect(icon).toHaveAttribute("width", "24");
    expect(icon).toHaveAttribute("height", "24");
  });

  it("size prop이 지정되면 해당 값으로 렌더링됩니다.", () => {
    render(<Icon name="Logo" size={40} />);
    const icon = screen.getByTestId("mock-logo");
    expect(icon).toHaveAttribute("width", "40");
    expect(icon).toHaveAttribute("height", "40");
  });

  it("title prop이 전달되면 aria-label이 설정되고 aria-hidden은 false입니다.", () => {
    render(<Icon name="Logo" title="로고 아이콘" />);
    const icon = screen.getByTestId("mock-logo");
    expect(icon).toHaveAttribute("aria-label", "로고 아이콘");
    expect(icon).toHaveAttribute("aria-hidden", "false");
  });

  it("title prop이 없으면 aria-hidden이 true입니다.", () => {
    render(<Icon name="Logo" />);
    const icon = screen.getByTestId("mock-logo");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("존재하지 않는 name을 전달하면 undefined로 인해 에러가 발생합니다.", () => {
    // @ts-expect-error 의도적 오류 테스트
    expect(() => render(<Icon name="NotExist" />)).toThrow();
  });
});
