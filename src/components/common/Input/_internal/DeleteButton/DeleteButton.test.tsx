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

  // 테스트 1
  it("기본적으로 렌더링되며 'Delete' 아이콘(Mock)을 포함하는지 확인", () => {
    render(<DeleteButton />);

    expect(getButton()).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveTextContent("Delete");
  });

  // 테스트 2
  it("eyeShow prop이 true일 때 'right-8' 클래스를 가지는지 확인", () => {
    render(<DeleteButton eyeShow={true} />);

    expect(getButton()).toHaveClass("right-8");
    expect(getButton()).not.toHaveClass("right-2");
  });

  // 테스트 3
  it("버튼 클릭 시 onDelete 함수가 1번 호출되는지 확인", async () => {
    const user = userEvent.setup();
    const mockOnDelete = jest.fn();

    render(<DeleteButton onDelete={mockOnDelete} />);

    await user.click(getButton());

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  // 테스트 4
  it("custom className prop이 전달되면 클래스 목록에 포함되는지 확인", () => {
    render(<DeleteButton className="my-custom-class" />);

    expect(getButton()).toHaveClass("my-custom-class");
  });
});
