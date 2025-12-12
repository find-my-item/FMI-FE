import { render, screen } from "@testing-library/react";
import ContentSection from "./ContentSection";

jest.mock("@/components", () => ({
  RequiredText: () => <span data-testid="required-text">*</span>,
}));

describe("ContentSection", () => {
  it("내용 입력 섹션이 렌더링되어야 한다", () => {
    render(<ContentSection />);
    expect(screen.getByText("내용을 입력해 주세요.")).toBeInTheDocument();
  });

  it("라벨과 RequiredText가 표시되어야 한다", () => {
    render(<ContentSection />);
    expect(screen.getByText("내용을 입력해 주세요.")).toBeInTheDocument();
    expect(screen.getByTestId("required-text")).toBeInTheDocument();
  });

  it("textarea가 존재하고 placeholder와 required 속성을 가져야 한다", () => {
    render(<ContentSection />);

    const textarea = screen.getByPlaceholderText("");

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("required");
  });

  it("textarea의 rows 기본값은 5이어야 한다", () => {
    render(<ContentSection />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
  });
});
