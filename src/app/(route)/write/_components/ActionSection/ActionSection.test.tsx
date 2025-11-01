import { render, screen } from "@testing-library/react";
import ActionSection from "./ActionSection";

describe("ActionSection", () => {
  it("섹션과 제출 버튼이 렌더링되어야 합니다", () => {
    render(<ActionSection disabled={false} />);
    expect(screen.getByLabelText("작성 완료")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "작성 완료" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("disabled=false일 때 활성화 스타일이 적용되어야 합니다", () => {
    render(<ActionSection disabled={false} />);
    const button = screen.getByRole("button", { name: "작성 완료" });

    expect(button.className).toContain("bg-fill-brand-normal-default");
    expect(button.className).toContain("text-brand-normal-default");
    expect(button.className).not.toContain("cursor-not-allowed");
  });

  it("disabled=true일 때 비활성화 스타일이 적용되어야 합니다", () => {
    render(<ActionSection disabled={true} />);
    const button = screen.getByRole("button", { name: "작성 완료" });

    expect(button.className).toContain("bg-fill-brand-normal-disabled");
    expect(button.className).toContain("text-brand-normal-disabled");
    expect(button.className).toContain("cursor-not-allowed");
  });
});
