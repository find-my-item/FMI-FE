import { render, screen } from "@testing-library/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import ActionSection from "./ActionSection";

const ButtonMock = jest.fn(
  ({
    children,
    className,
    ...rest
  }: { children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button data-testid="submit-button" className={className ?? ""} {...rest}>
      {children}
    </button>
  )
);

jest.mock("@/components/common", () => ({
  Button: (props: any) => ButtonMock(props),
}));

describe("ActionSection", () => {
  beforeEach(() => {
    ButtonMock.mockClear();
  });

  it("섹션과 제출 버튼이 렌더링되어야 합니다", () => {
    render(<ActionSection disabled={false} />);

    expect(screen.getByRole("button", { name: "작성 완료" })).toBeInTheDocument();

    const button = screen.getByTestId("submit-button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("disabled=false일 때 버튼이 비활성화되지 않아야 합니다", () => {
    render(<ActionSection disabled={false} />);

    expect(ButtonMock).toHaveBeenCalled();
    const props = ButtonMock.mock.calls[0][0];
    expect(props.disabled).toBe(false);
  });

  it("disabled=true일 때 버튼이 비활성화되어야 합니다", () => {
    render(<ActionSection disabled={true} />);

    expect(ButtonMock).toHaveBeenCalled();
    const props = ButtonMock.mock.calls[0][0];
    expect(props.disabled).toBe(true);
  });
});
