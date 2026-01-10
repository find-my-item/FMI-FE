import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryPopup from "./CategoryPopup";

jest.mock("@/components/domain", () => ({
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

  it("옵션 클릭 시 해당 라디오 배경 색이 변경되어야 합니다", async () => {
    render(<CategoryPopup isOpen={true} onClose={jest.fn()} />);
    const user = userEvent.setup();

    const walletLabel = screen.getByText("지갑").closest("label")!;
    expect(walletLabel.className).not.toContain("bg-fill-neutral-strong-default");

    await user.click(walletLabel);

    expect(walletLabel.className).toContain("bg-fill-neutral-strong-default");
  });
});
