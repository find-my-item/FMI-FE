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

/**
 * 3. 테스트 코드
 */
describe("InputChat 컴포넌트", () => {
  it("필수 요소들이 올바르게 렌더링 되는지 확인", () => {
    renderComponent();

    // 이미지 첨부 버튼 (label)
    expect(screen.getByLabelText("이미지 첨부")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();

    // 메시지 입력창
    expect(screen.getByPlaceholderText("메시지 보내기")).toBeInTheDocument();

    // 전송 버튼
    expect(screen.getByLabelText("전송 버튼")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("입력창에 텍스트를 입력할 수 있는지 확인", async () => {
    const { user } = renderComponent();
    const input = screen.getByPlaceholderText<HTMLInputElement>("메시지 보내기");

    await user.type(input, "안녕하세요");
    expect(input.value).toBe("안녕하세요");
  });

  it("텍스트 입력 시 입력창에 'text-neutral-strong-focused' 클래스가 적용되는지 확인", async () => {
    const { user } = renderComponent();
    const input = screen.getByPlaceholderText("메시지 보내기");

    // 1. 입력 전: 클래스가 없는지 확인
    expect(input).not.toHaveClass("text-neutral-strong-focused");

    // 2. 입력 후: 클래스가 적용되었는지 확인
    await user.type(input, "A");
    expect(input).toHaveClass("text-neutral-strong-focused");
  });

  // 전송 버튼 테스트
  it("전송 버튼 클릭 시 sendClick 함수가 호출된다", async () => {
    const { user, props } = renderComponent();
    const sendButton = screen.getByLabelText("전송 버튼");

    await user.click(sendButton);
    expect(props.sendClick).toHaveBeenCalledTimes(1);
  });

  // disabled 테스트
  it("disabled prop이 true일 때 입력창이 비활성화된다", () => {
    renderComponent({ disabled: true });

    const input = screen.getByPlaceholderText("메시지 보내기");
    expect(input).toBeDisabled();
  });

  // TODO(수현): 버튼 disabled 처리 추가 후 주석 제거
  // it("disabled prop이 true일때 비활성화된다", () => {
  //   renderComponent({ disabled: true });

  //   const sendButton = screen.getByLabelText("전송 버튼");
  //   expect(sendButton).not.toBeDisabled();
  // });
});
