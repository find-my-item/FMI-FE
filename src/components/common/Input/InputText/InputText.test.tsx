import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import InputText from "./InputText";
import "@testing-library/jest-dom";

jest.mock("@/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

jest.mock("@/components/common/Icon/Icon", () => {
  const MockIcon = ({ name }: { name: string }) => <span>{name}</span>;
  MockIcon.displayName = "MockIcon";
  return {
    __esModule: true,
    default: MockIcon,
  };
});

jest.mock("@/components/common/Buttons/Button/Button", () => {
  const MockButton = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>;
  MockButton.displayName = "MockButton";
  return {
    __esModule: true,
    default: MockButton,
  };
});

jest.mock("../_internal/DeleteButton/DeleteButton", () => {
  const MockDeleteButton = ({ value, onDelete }: { value: string; onDelete: () => void }) =>
    value ? (
      <button data-testid="delete-button" onClick={onDelete}>
        Delete
      </button>
    ) : null;
  MockDeleteButton.displayName = "MockDeleteButton";
  return {
    __esModule: true,
    default: MockDeleteButton,
  };
});

jest.mock("../_internal/Label/Label", () => {
  const MockLabel = ({
    name,
    label,
    required,
  }: {
    name: string;
    label: string;
    required: boolean;
  }) => (
    <label htmlFor={name}>
      {label}
      {required && "*"}
    </label>
  );
  MockLabel.displayName = "MockLabel";
  return {
    __esModule: true,
    default: MockLabel,
  };
});

// Caption Mock (에러/성공 메시지만 렌더링)
jest.mock("../_internal/Caption/Caption", () => {
  const MockCaption = ({
    errorMessage,
    successMessage,
  }: {
    errorMessage?: string;
    successMessage?: string;
  }) => (
    <div>
      {errorMessage && <span data-testid="error-message">{errorMessage}</span>}
      {successMessage && <span data-testid="success-message">{successMessage}</span>}
    </div>
  );
  MockCaption.displayName = "MockCaption";
  return {
    __esModule: true,
    default: MockCaption,
  };
});

jest.mock("../_internal/Counter/Counter", () => {
  const MockCounter = ({ isLength, maxLength }: { isLength: number; maxLength?: number }) =>
    maxLength ? (
      <div data-testid="counter">
        {isLength}/{maxLength}
      </div>
    ) : null;
  MockCounter.displayName = "MockCounter";
  return {
    __esModule: true,
    default: MockCounter,
  };
});

const mockOnDelete = jest.fn();
jest.mock("../_internal/_hooks/useFormInput", () => ({
  useFormInput: () => ({
    onDelete: mockOnDelete,
  }),
}));

const renderComponent = (
  props: Partial<React.ComponentProps<typeof InputText>>,
  formConfig: Partial<UseFormProps> = {}
) => {
  const defaultProps = { name: "testInput" };
  const mergedProps = { ...defaultProps, ...props };
  const user = userEvent.setup();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues: { [mergedProps.name]: "" },
      mode: "onChange",
      ...formConfig,
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  render(<InputText {...mergedProps} />, { wrapper: Wrapper });

  return {
    user,
    props: mergedProps,
    input: screen.getByLabelText(new RegExp(mergedProps.label || ""), {
      selector: "input",
    }) as HTMLInputElement,
  };
};

describe("InputText 컴포넌트", () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  // 테스트 1
  it("기본 요소(Label, Input)를 올바르게 렌더링하는지 확인", () => {
    renderComponent({ label: "테스트 라벨" });

    expect(screen.getByText("테스트 라벨")).toBeInTheDocument();
    expect(screen.getByLabelText("테스트 라벨")).toBeInTheDocument();
  });

  // 테스트 2
  it("validation.required가 true일 때 Label에 *가 표시되는지 확인", () => {
    renderComponent({ label: "필수 항목", validation: { required: true } });
    expect(screen.getByText("필수 항목*")).toBeInTheDocument();
  });

  // 테스트 3
  it("입력 시 값이 변경되고 DeleteButton(Mock)이 나타나는지 확인", async () => {
    const { user, input } = renderComponent({ label: "입력" });

    expect(input.value).toBe("");
    expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();

    await user.type(input, "테스트");

    expect(input.value).toBe("테스트");
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  // 테스트 4
  it("DeleteButton 클릭 시 useFormInput의 onDelete(Mock)를 호출하는지 확인", async () => {
    const { user, input } = renderComponent({ label: "삭제 테스트" });

    await user.type(input, "텍스트");
    const deleteButton = screen.getByTestId("delete-button");
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("testInput");
  });

  // 테스트 5
  it("eyeShow=true일 때 '비밀번호 보기/숨기기' 버튼이 작동한다", async () => {
    const { user, input } = renderComponent({
      label: "비밀번호",
      name: "password",
      eyeShow: true,
    });

    expect(input).toHaveAttribute("type", "password");
    expect(screen.getByText("EyeOff")).toBeInTheDocument();

    const eyeButton = screen.getByLabelText("비밀번호 보기");
    await user.click(eyeButton);

    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByText("EyeOpen")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호 숨기기")).toBeInTheDocument();
  });

  // 테스트 6
  it("children(Button)이 렌더링되고 클릭 시 btnOnClick을 호출하는지 확인", async () => {
    const mockBtnOnClick = jest.fn();
    const { user } = renderComponent({
      label: "이메일",
      btnOnClick: mockBtnOnClick,
      children: "중복 확인",
    });

    const customButton = screen.getByText("중복 확인");
    expect(customButton).toBeInTheDocument();

    await user.click(customButton);

    expect(mockBtnOnClick).toHaveBeenCalledTimes(1);
  });

  // 테스트 7
  it("RHF 에러 발생 시 에러 클래스가 적용되고 Caption(Mock)이 에러 메시지를 렌더링한다", async () => {
    const { user, input } = renderComponent({
      name: "intro",
      label: "소개",
      validation: {
        maxLength: { value: 5, message: "5자 이내로 입력해주세요." },
      },
    });

    await user.type(input, "여섯글자입니다");

    const errorMessage = await screen.findByTestId("error-message");

    expect(errorMessage).toHaveTextContent("5자 이내로 입력해주세요.");

    expect(input).toHaveClass("border border-system-warning");
  });
});

// 테스트 8
it("isSuccess=true일 때 Caption(Mock)이 성공 메시지를 렌더링하는지 확인", () => {
  renderComponent({
    label: "성공",
    isSuccess: true,
    successMessage: "성공했습니다",
  });

  expect(screen.getByTestId("success-message")).toHaveTextContent("성공했습니다");
});

// 테스트 9
it("maxLength가 있을 때 Counter(Mock)에 글자 수가 반영하는지 확인", async () => {
  const { user, input } = renderComponent({
    label: "카운터",
    validation: { maxLength: { value: 20, message: "20자 이내로 입력해주세요." } },
  });

  expect(screen.getByTestId("counter")).toHaveTextContent("0/20");

  await user.type(input, "hello");

  expect(screen.getByTestId("counter")).toHaveTextContent("5/20");
});
