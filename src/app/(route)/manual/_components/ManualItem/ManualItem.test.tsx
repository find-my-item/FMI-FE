import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ManualItem from "./ManualItem";

jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, ...rest }: any) => <a href={href} {...rest} />,
}));

jest.mock("@/components/common/Icon/Icon", () => ({
  __esModule: true,
  default: ({ name, ...rest }: any) => <span data-testid={`icon-${name}`} {...rest} />,
}));

describe("ManualItem", () => {
  const title = "자주 묻는 질문";
  const contentText = "정적 매뉴얼 내용입니다.";
  const href = "https://example.com";
  const btnText = "자세히 보기";

  it("닫힘 상태일 때 내용이 보이지 않고 aria-expanded=false 입니다.", () => {
    render(<ManualItem title={title} content={<span>{contentText}</span>} isOpen={false} />);

    // 내용 미표시
    expect(screen.queryByText(contentText)).toBeNull();

    // 헤더 영역의 aria-expanded
    const headerButton = screen.getByRole("button");
    const clickableContainer = headerButton.parentElement as HTMLDivElement;
    expect(clickableContainer).toHaveAttribute("aria-expanded", "false");

    // 화살표 회전 클래스 미적용
    const arrow = screen.getByTestId("icon-ArrowDown");
    const arrowWrapper = arrow.parentElement as HTMLElement;
    expect(arrowWrapper.className).not.toContain("rotate-180");
  });

  it("열림 상태일 때 내용이 보이고 aria-expanded=true 입니다.", () => {
    render(<ManualItem title={title} content={<span>{contentText}</span>} isOpen />);

    expect(screen.getByText(contentText)).toBeInTheDocument();

    const headerButton = screen.getByRole("button");
    const clickableContainer = headerButton.parentElement as HTMLDivElement;
    expect(clickableContainer).toHaveAttribute("aria-expanded", "true");

    const arrow = screen.getByTestId("icon-ArrowDown");
    const arrowWrapper = arrow.parentElement as HTMLElement;
    expect(arrowWrapper.className).toContain("rotate-180");
  });

  it("href가 주어지면 링크와 버튼 텍스트가 렌더링됩니다.", () => {
    render(
      <ManualItem
        title={title}
        content={<span>{contentText}</span>}
        isOpen
        href={href}
        btnText={btnText}
      />
    );

    const link = screen.getByRole("link", { name: btnText });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("헤더 클릭 시 onToggle이 호출됩니다.", () => {
    const onToggle = jest.fn();
    render(<ManualItem title={title} content={<span>{contentText}</span>} onToggle={onToggle} />);

    const headerButton = screen.getByRole("button");
    fireEvent.click(headerButton);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("href가 없으면 링크가 렌더링되지 않습니다.", () => {
    render(<ManualItem title={title} content={<span>{contentText}</span>} isOpen />);

    expect(screen.queryByRole("link")).toBeNull();
  });
});
