import { render, screen } from "@testing-library/react";
import LocationSection from "./LocationSection";

jest.mock("@/components", () => ({
  Icon: ({ title }: { title: string }) => <span data-testid={`icon-${title}`}>{title}</span>,
}));
jest.mock("@/components/RequiredText/RequiredText", () => () => (
  <span data-testid="required-text">*</span>
));

describe("LocationSection", () => {
  it("위치 등록 섹션이 렌더링되어야 한다", () => {
    render(<LocationSection />);

    const section = screen.getByLabelText("위치 등록");
    expect(section).toBeInTheDocument();
  });

  it("위치 텍스트와 RequiredText가 표시되어야 한다", () => {
    render(<LocationSection />);

    expect(screen.getByText("위치를 등록해 주세요.")).toBeInTheDocument();
    expect(screen.getByTestId("required-text")).toBeInTheDocument();
  });

  it("Location 아이콘과 ArrowRight 아이콘이 각각 존재해야 한다", () => {
    render(<LocationSection />);

    expect(screen.getByTestId("icon-위치 등록")).toBeInTheDocument();
    expect(screen.getByTestId("icon-위치 열기")).toBeInTheDocument();
  });

  it("위치 열기 버튼이 존재해야 한다", () => {
    render(<LocationSection />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
