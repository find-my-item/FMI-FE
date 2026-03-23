import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DeleteButton from "./DeleteButton";

jest.mock("@/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

jest.mock("@/components/common/Icon/Icon", () => {
  const MockIcon = ({ name }: { name: string }) => <span data-testid="icon">{name}</span>;
  MockIcon.displayName = "MockIcon";
  return {
    __esModule: true,
    default: MockIcon,
  };
});

describe("DeleteButton 컴포넌트", () => {
  const getButton = () => screen.getByLabelText("입력값 전체 삭제");

  it("값이 비어 있거나 공백만 있으면 렌더하지 않는다", () => {
    const { rerender } = render(<DeleteButton />);
    expect(screen.queryByLabelText("입력값 전체 삭제")).not.toBeInTheDocument();

    rerender(<DeleteButton value="" />);
    expect(screen.queryByLabelText("입력값 전체 삭제")).not.toBeInTheDocument();

    rerender(<DeleteButton value="   " />);
    expect(screen.queryByLabelText("입력값 전체 삭제")).not.toBeInTheDocument();
  });

  it("값이 있을 때 렌더링되며 'Delete' 아이콘(Mock)을 포함하는지 확인", () => {
    render(<DeleteButton value="입력됨" />);

    expect(getButton()).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveTextContent("Delete");
  });

  it("eyeShow prop이 true일 때 'right-8' 클래스를 가지는지 확인", () => {
    render(<DeleteButton eyeShow={true} value="x" />);

    expect(getButton()).toHaveClass("right-8");
    expect(getButton()).not.toHaveClass("right-2");
  });

  it("버튼 클릭 시 onDelete 함수가 1번 호출되는지 확인", async () => {
    const user = userEvent.setup();
    const mockOnDelete = jest.fn();

    render(<DeleteButton onDelete={mockOnDelete} value="x" />);

    await user.click(getButton());

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("custom className prop이 전달되면 클래스 목록에 포함되는지 확인", () => {
    render(<DeleteButton className="my-custom-class" value="x" />);

    expect(getButton()).toHaveClass("my-custom-class");
  });
});
