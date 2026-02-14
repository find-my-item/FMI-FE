import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import InputText, { InputTextProps } from "./InputText";
import "@testing-library/jest-dom";

jest.mock("@/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

jest.mock("@/components/common/Icon/Icon", () => {
  const MockIcon = ({ name }: { name: string }) => <span>{name}</span>;
  MockIcon.displayName = "MockIcon";
  return { __esModule: true, default: MockIcon };
});

jest.mock("../../Buttons/Button/Button", () => {
  const MockButton = ({ children, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
  MockButton.displayName = "MockButton";
  return { __esModule: true, default: MockButton };
});

jest.mock("../_internal/DeleteButton/DeleteButton", () => {
  const MockDeleteButton = ({ value, onDelete }: any) =>
    value ? (
      <button data-testid="delete-button" onClick={onDelete}>
        Delete
      </button>
    ) : null;
  MockDeleteButton.displayName = "MockDeleteButton";
  return { __esModule: true, default: MockDeleteButton };
});

jest.mock("../_internal/Label/Label", () => {
  const MockLabel = ({ name, label, required }: any) => (
    <label htmlFor={name}>
      {label}
      {required && "*"}
    </label>
  );
  MockLabel.displayName = "MockLabel";
  return { __esModule: true, default: MockLabel };
});

jest.mock("../_internal/Caption/Caption", () => {
  const MockCaption = ({ errorMessage, successMessage }: any) => (
    <div>
      {errorMessage && <span data-testid="error-message">{errorMessage}</span>}
      {successMessage && <span data-testid="success-message">{successMessage}</span>}
    </div>
  );
  MockCaption.displayName = "MockCaption";
  return { __esModule: true, default: MockCaption };
});

jest.mock("../_internal/Counter/Counter", () => {
  const MockCounter = ({ isLength, maxLength }: any) =>
    maxLength ? (
      <div data-testid="counter">
        {isLength}/{maxLength}
      </div>
    ) : null;
  MockCounter.displayName = "MockCounter";
  return { __esModule: true, default: MockCounter };
});

const mockOnDelete = jest.fn();
jest.mock("../_internal/_hooks/useFormInput", () => ({
  useFormInput: () => ({ onDelete: mockOnDelete }),
}));

const renderComponent = (
  props: Partial<InputTextProps> = {},
  formConfig: Partial<UseFormProps> = {}
) => {
  const name = props.inputOption?.name || "testInput";
  const labelText = props.label || "테스트 라벨";

  const defaultProps: InputTextProps = {
    inputOption: { name, type: "text" },
    label: labelText,
  };

  const mergedProps = {
    ...defaultProps,
    ...props,
    inputOption: { ...defaultProps.inputOption, ...props.inputOption },
    btnOption: { ...props.btnOption },
    caption: { ...props.caption },
  };

  const user = userEvent.setup();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues: { [name]: "" },
      mode: "onChange",
      ...formConfig,
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  render(<InputText {...mergedProps} />, { wrapper: Wrapper });

  return {
    user,
    props: mergedProps,
    input: screen.getByLabelText(new RegExp(mergedProps.label || "")) as HTMLInputElement,
  };
};

describe("InputText 컴포넌트 통합 테스트", () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it("기본 Label과 Input이 정상적으로 렌더링된다", () => {
    renderComponent({ label: "아이디" });
    expect(screen.getByText("아이디")).toBeInTheDocument();
  });

  it("필수 입력 설정 시 Label에 *가 표시된다", () => {
    renderComponent({
      label: "이메일",
      inputOption: { name: "email", validation: { required: true } },
    });
    expect(screen.getByText("이메일*")).toBeInTheDocument();
  });

  it("텍스트 입력 시 삭제 버튼이 활성화되고 클릭 시 onDelete가 호출된다", async () => {
    const { user, input } = renderComponent({ label: "검색" });

    await user.type(input, "입력값");
    const deleteBtn = screen.getByTestId("delete-button");
    expect(deleteBtn).toBeInTheDocument();

    await user.click(deleteBtn);
    expect(mockOnDelete).toHaveBeenCalledWith("testInput");
  });

  it("btnOption 전달 시 버튼이 렌더링되며 클릭 시 입력값을 인자로 호출한다", async () => {
    const mockBtnOnClick = jest.fn();
    const { user, input } = renderComponent({
      label: "닉네임",
      btnOption: {
        btnLabel: "중복확인",
        btnOnClick: mockBtnOnClick,
      },
    });

    await user.type(input, "내닉네임");
    const actionBtn = screen.getByRole("button", { name: "중복확인" });
    await user.click(actionBtn);

    expect(mockBtnOnClick).toHaveBeenCalledWith("내닉네임");
  });

  it("유효성 검사 실패 시 에러 스타일이 적용되고 에러 메시지가 노출된다", async () => {
    const { user, input } = renderComponent({
      inputOption: {
        name: "test",
        validation: { minLength: { value: 5, message: "최소 5자" } },
      },
    });

    await user.type(input, "123");

    const errorMsg = await screen.findByTestId("error-message");
    expect(errorMsg).toHaveTextContent("최소 5자");
    expect(input).toHaveClass("border-system-warning");
  });

  it("isSuccess 상태일 때 성공 메시지를 렌더링한다", () => {
    renderComponent({
      caption: {
        isSuccess: true,
        successMessage: "사용 가능합니다",
      },
    });

    expect(screen.getByTestId("success-message")).toHaveTextContent("사용 가능합니다");
  });

  it("maxLength가 설정된 경우 글자 수 카운터가 올바르게 작동한다", async () => {
    const { user, input } = renderComponent({
      inputOption: {
        name: "counterTest",
        validation: { maxLength: 10 },
      },
    });

    const counter = screen.getByTestId("counter");
    expect(counter).toHaveTextContent("0/10");

    await user.type(input, "abc");
    expect(counter).toHaveTextContent("3/10");
  });
});
