import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TitleSection from "./TitleSection";

jest.mock("@/components/common", () => ({
  RequiredText: () => <span data-testid="required-text">*</span>,
}));

describe("TitleSection", () => {
  it("제목 입력 섹션이 렌더링되어야 한다", () => {
    render(<TitleSection />);
    expect(screen.getByText("제목을 입력해 주세요.")).toBeInTheDocument();
  });

  it("제목 입력 input이 존재하고 placeholder가 설정되어 있어야 한다", () => {
    render(<TitleSection />);

    const input = screen.getByPlaceholderText("제목을 입력해 주세요.");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("required");
  });

  it("라벨 텍스트와 RequiredText가 함께 표시되어야 한다", () => {
    render(<TitleSection />);

    const labelText = screen.getByText("제목을 입력해 주세요.");
    expect(labelText).toBeInTheDocument();

    const required = screen.getByTestId("required-text");
    expect(required).toBeInTheDocument();
  });

  it("사용자가 입력을 시작하면 placeholder가 사라져야 한다 (peer 스타일 작동 확인용)", async () => {
    render(<TitleSection />);
    const input = screen.getByPlaceholderText("제목을 입력해 주세요.");

    await userEvent.type(input, "테스트 제목");
    expect(input).toHaveValue("테스트 제목");
  });
});
