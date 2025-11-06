import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import InputSearch from "./InputSearch";
import "@testing-library/jest-dom";

jest.mock("../../Icon/Icon", () => {
  const MockIcon = ({ name }: { name: string }) => <div data-testid="icon">{name}</div>;
  MockIcon.displayName = "MockIcon";
  return {
    __esModule: true,
    default: MockIcon,
  };
});

jest.mock("../_internal/DeleteButton/DeleteButton", () => {
  const MockDeleteButton = ({ value, onDelete }: { value: string; onDelete: () => void }) => {
    if (!value) {
      return null;
    }
    return (
      <button data-testid="delete-button" onClick={onDelete}>
        X
      </button>
    );
  };
  MockDeleteButton.displayName = "MockDeleteButton";
  return {
    __esModule: true,
    default: MockDeleteButton,
  };
});

const renderComponent = (props: React.ComponentProps<typeof InputSearch>) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues: {
        [props.name]: "",
      },
      mode: "onChange",
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  const user = userEvent.setup();
  const utils = render(<InputSearch {...props} />, { wrapper: Wrapper });

  return {
    ...utils,
    user,
    props,
    input: screen.getByRole("textbox") as HTMLInputElement,
  };
};

describe("InputSearch 컴포넌트", () => {
  // 공통 테스트
  it("검색 아이콘과 입력창을 올바르게 렌더링하는지 확인", () => {
    renderComponent({
      name: "search",
      mode: "RHF",
      onEnter: jest.fn(),
      placeholder: "검색어를 입력하세요",
    });

    expect(screen.getByTestId("icon")).toHaveTextContent("Search");
    expect(screen.getByPlaceholderText("검색어를 입력하세요")).toBeInTheDocument();
  });

  // mode="RHF"
  describe('mode: "RHF" (react-hook-form 연동)', () => {
    it("입력 시 RHF 값(watch)이 변경되고 삭제 버튼이 나타난다", async () => {
      const { user, input } = renderComponent({
        name: "searchRHF",
        mode: "RHF",
        onEnter: jest.fn(),
      });

      expect(input.value).toBe("");
      expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();

      await user.type(input, "테스트");

      expect(input.value).toBe("테스트");
      expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });

    it("Enter 키 입력 시 onEnter 함수를 RHF 값으로 호출하는지 확인", async () => {
      const mockOnEnter = jest.fn();
      const { user, input } = renderComponent({
        name: "searchRHF",
        mode: "RHF",
        onEnter: mockOnEnter,
      });

      await user.type(input, "RHF 엔터 테스트");
      await user.keyboard("{Enter}");

      expect(mockOnEnter).toHaveBeenCalledTimes(1);
      expect(mockOnEnter).toHaveBeenCalledWith("RHF 엔터 테스트");
    });

    it("삭제 버튼 클릭 시 RHF 값(setValue)이 초기화되는지 확인", async () => {
      const { user, input } = renderComponent({
        name: "searchRHF",
        mode: "RHF",
        onEnter: jest.fn(),
      });

      await user.type(input, "삭제 테스트");
      expect(input.value).toBe("삭제 테스트");

      // 삭제 버튼 클릭
      const deleteButton = screen.getByTestId("delete-button");
      await user.click(deleteButton);

      expect(input.value).toBe("");
      expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();
    });
  });

  // mode="onChange" 테스트
  describe('mode: "onChange" (내부 state 사용)', () => {
    it("입력 시 내부 state 값이 변경되고 삭제 버튼이 나타나는지 확인", async () => {
      const { user, input } = renderComponent({
        name: "searchLocal",
        mode: "onChange",
        onEnter: jest.fn(),
      });

      expect(input.value).toBe("");
      expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();

      await user.type(input, "로컬 테스트");

      expect(input.value).toBe("로컬 테스트");
      expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });

    it("Enter 키 입력 시 onEnter 함수를 내부 state 값으로 호출하는지 확인", async () => {
      const mockOnEnter = jest.fn();
      const { user, input } = renderComponent({
        name: "searchLocal",
        mode: "onChange",
        onEnter: mockOnEnter,
      });

      await user.type(input, "로컬 엔터 테스트");
      await user.keyboard("{Enter}");

      expect(mockOnEnter).toHaveBeenCalledTimes(1);
      expect(mockOnEnter).toHaveBeenCalledWith("로컬 엔터 테스트");
    });

    it("삭제 버튼 클릭 시 내부 state 값이 초기화된다", async () => {
      const { user, input } = renderComponent({
        name: "searchLocal",
        mode: "onChange",
        onEnter: jest.fn(),
      });

      await user.type(input, "삭제 테스트");
      expect(input.value).toBe("삭제 테스트");

      const deleteButton = screen.getByTestId("delete-button");
      await user.click(deleteButton);

      expect(input.value).toBe("");
      expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();
    });
  });
});
