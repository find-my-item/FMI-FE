import { render, screen } from "@testing-library/react";
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
  const defaultProps: InputTextProps = {
    inputOption: { name, type: "text" },
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
    input: screen.getByRole("textbox", {
      name: new RegExp(mergedProps.label || ""),
    }) as HTMLInputElement,
  };
};

describe("InputText 컴포넌트 (리팩토링 버전)", () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it("Label과 Input이 올바른 객체 구조로 렌더링되는지 확인", () => {
    renderComponent({ label: "테스트 라벨" });
    expect(screen.getByText("테스트 라벨")).toBeInTheDocument();
  });

  it("validation.required가 true일 때 라벨에 필수 표시가 나타나는지 확인", () => {
    renderComponent({
      label: "필수 항목",
      inputOption: { name: "req", validation: { required: true } },
    });
    expect(screen.getByText("필수 항목*")).toBeInTheDocument();
  });

  it("입력 시 DeleteButton이 나타나고 클릭 시 onDelete를 호출하는지 확인", async () => {
    const { user, input } = renderComponent({ label: "입력" });
    await user.type(input, "테스트");

    const deleteBtn = screen.getByTestId("delete-button");
    expect(deleteBtn).toBeInTheDocument();

    await user.click(deleteBtn);
    expect(mockOnDelete).toHaveBeenCalledWith("testInput");
  });

  it("type='password'일 때 눈 아이콘 버튼이 비밀번호 타입을 토글하는지 확인", async () => {
    const { user, input } = renderComponent({
      label: "비밀번호",
      inputOption: { name: "password", type: "password" },
    });

    expect(input).toHaveAttribute("type", "password");

    const toggleBtn = screen.getByLabelText("비밀번호 보기");
    await user.click(toggleBtn);

    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByText("EyeOpen")).toBeInTheDocument();
  });

  it("btnOption이 전달될 때 버튼이 렌더링되고 클릭 시 btnOnClick을 호출하는지 확인", async () => {
    const mockBtnOnClick = jest.fn();
    const { user, input } = renderComponent({
      btnOption: {
        btnLabel: "인증요청",
        btnOnClick: mockBtnOnClick,
      },
    });

    await user.type(input, "test-value");
    const button = screen.getByRole("button", { name: "인증요청" });
    await user.click(button);

    expect(mockBtnOnClick).toHaveBeenCalledWith("test-value");
  });

  it("caption 옵션의 성공 메시지가 렌더링되는지 확인", () => {
    renderComponent({
      caption: {
        isSuccess: true,
        successMessage: "사용 가능한 아이디입니다",
      },
    });

    expect(screen.getByTestId("success-message")).toHaveTextContent("사용 가능한 아이디입니다");
  });

  it("RHF 검증 실패 시 에러 스타일과 메시지가 노출되는지 확인", async () => {
    const { user, input } = renderComponent({
      inputOption: {
        name: "nickname",
        validation: { minLength: { value: 5, message: "5자 이상 입력" } },
      },
    });

    await user.type(input, "abc");
    const errorMsg = await screen.findByTestId("error-message");

    expect(errorMsg).toHaveTextContent("5자 이상 입력");
    expect(input).toHaveClass("border border-system-warning");
  });

  it("maxLength 설정 시 카운터에 반영되는지 확인", async () => {
    const { user, input } = renderComponent({
      inputOption: {
        name: "limit",
        validation: { maxLength: 10 },
      },
    });

    expect(screen.getByTestId("counter")).toHaveTextContent("0/10");
    await user.type(input, "hello");
    expect(screen.getByTestId("counter")).toHaveTextContent("5/10");
  });
});
