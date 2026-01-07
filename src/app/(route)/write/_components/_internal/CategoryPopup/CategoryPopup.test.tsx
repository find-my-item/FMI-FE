import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryPopup from "./CategoryPopup";

jest.mock("@/components/common", () => ({
  PopupLayout: ({ isOpen, onClose, children }: any) =>
    isOpen && (
      <div data-testid="popup">
        {children}
        <button onClick={onClose}>모달 닫기</button>
      </div>
    ),
}));

describe("CategoryPopup", () => {
  it("isOpen=true이면 제목과 7개 옵션이 렌더링되어야 합니다", () => {
    const { container } = render(<CategoryPopup isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("카테고리 선택")).toBeInTheDocument();

    const inputs = container.querySelectorAll('input[type="radio"][name="category"]');
    expect(inputs).toHaveLength(7);

    expect(screen.getByText("전자기기")).toBeInTheDocument();
    expect(screen.getByText("기타")).toBeInTheDocument();
  });

  it("옵션 클릭 시 해당 라디오가 선택되어야 합니다", async () => {
    render(<CategoryPopup isOpen={true} onClose={jest.fn()} />);
    const user = userEvent.setup();

    const walletInput = screen.getByLabelText("지갑") as HTMLInputElement;
    expect(walletInput).not.toBeChecked();

    await user.click(screen.getByText("지갑").closest("label")!);

    expect(walletInput).toBeChecked();
  });

  it("선택 전/후 적용하기 버튼 클래스가 변경되어야 합니다", async () => {
    render(<CategoryPopup isOpen={true} onClose={jest.fn()} />);
    const user = userEvent.setup();

    const applyBtn = screen.getByRole("button", { name: "적용하기" });
    expect(applyBtn.className).toContain("bg-[#98E3BD]/90");
    expect(applyBtn.className).toContain("text-[#C2F1D4]");

    const idInput = screen.getByLabelText("신분증") as HTMLInputElement;
    await user.click(screen.getByText("신분증").closest("label")!);

    expect(idInput).toBeChecked();
    expect(applyBtn.className).toContain("bg-[#1EB87B]/70");
    expect(applyBtn.className).toContain("text-[#F6FFFC]");
  });
});
