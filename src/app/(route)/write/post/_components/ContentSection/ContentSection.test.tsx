import { render, screen } from "@testing-library/react";
import ContentSection from "./ContentSection";

const registerMock = jest.fn(() => ({ name: "content" }));

jest.mock("@/components/common", () => ({
  RequiredText: () => <span data-testid="required-text">*</span>,
}));

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    register: registerMock,
  }),
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

  it("textarea가 존재하고 placeholder 속성을 가져야 한다", () => {
    render(<ContentSection />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", " ");
  });

  it("textarea의 rows 기본값은 5이어야 한다", () => {
    render(<ContentSection />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("register가 올바른 유효성 검사 옵션과 함께 호출되어야 한다", () => {
    render(<ContentSection />);
    expect(registerMock).toHaveBeenCalledWith("content", {
      required: "내용을 입력해주세요.",
      maxLength: {
        value: 500,
        message: "내용은 500자 이내로 입력해주세요.",
      },
    });
  });
});
