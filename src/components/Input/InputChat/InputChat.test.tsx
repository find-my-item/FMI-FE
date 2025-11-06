import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import InputChat from "./InputChat";
import "@testing-library/jest-dom";

jest.mock("@/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

jest.mock("@/components/Icon/Icon", () => {
  const MockIcon = ({ name }: { name: string }) => <div data-testid="icon">{name}</div>;
  MockIcon.displayName = "MockIcon";
  return {
    __esModule: true,
    default: MockIcon,
  };
});

const renderComponent = (props: Partial<React.ComponentProps<typeof InputChat>> = {}) => {
  const defaultProps = {
    name: "test-chat",
    sendClick: jest.fn(),
  };
  const mergedProps = { ...defaultProps, ...props };

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues: {
        [mergedProps.name]: "",
      },
      mode: "onChange",
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  const user = userEvent.setup();

  const utils = render(<InputChat {...mergedProps} />, { wrapper: Wrapper });

  return {
    ...utils,
    user,
    props: mergedProps,
  };
};

describe("InputChat 컴포넌트", () => {
  // 테스트 1
  it("필수 요소들이 올바르게 렌더링 되는지 확인", () => {
    renderComponent();

    expect(screen.getByLabelText("이미지 첨부")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("메시지 보내기")).toBeInTheDocument();

    expect(screen.getByLabelText("전송 버튼")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  // 테스트 2
  it("입력창에 텍스트를 입력할 수 있는지 확인", async () => {
    const { user } = renderComponent();
    const input = screen.getByPlaceholderText<HTMLInputElement>("메시지 보내기");

    await user.type(input, "안녕하세요");
    expect(input.value).toBe("안녕하세요");
  });

  // 테스트 3
  it("텍스트 입력 시 입력창에 'text-neutral-strong-focused' 클래스가 적용되는지 확인", async () => {
    const { user } = renderComponent();
    const input = screen.getByPlaceholderText("메시지 보내기");

    expect(input).not.toHaveClass("text-neutral-strong-focused");

    await user.type(input, "A");
    expect(input).toHaveClass("text-neutral-strong-focused");
  });

  // 테스트 4
  it("전송 버튼 클릭 시 sendClick 함수가 호출되는지 확인", async () => {
    const { user, props } = renderComponent();
    const sendButton = screen.getByLabelText("전송 버튼");

    await user.click(sendButton);
    expect(props.sendClick).toHaveBeenCalledTimes(1);
  });

  // 테스트 5
  it("disabled prop이 true일 때 입력창이 비활성화되는지 확인", () => {
    renderComponent({ disabled: true });

    const input = screen.getByPlaceholderText("메시지 보내기");
    expect(input).toBeDisabled();
  });

  // 테스트 6
  it("disabled prop이 true일때 비활성화 되는지 확인", () => {
    renderComponent({ disabled: true });

    const sendButton = screen.getByLabelText("전송 버튼");
    expect(sendButton).toBeDisabled();
  });
});
