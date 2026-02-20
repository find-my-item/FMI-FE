import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toast from "./Toast";

jest.mock("../Icon/Icon", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="icon" {...props} />,
}));

jest.mock("@/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("<Toast />", () => {
  it("메시지를 렌더링합니다.", () => {
    render(<Toast message="완료되었습니다" type="success" />);
    expect(screen.getByText("완료되었습니다")).toBeInTheDocument();
  });

  it("성공 타입일 때 green 배경을 적용합니다.", () => {
    render(<Toast message="성공" type="success" />);
    const bgDiv = screen.getByTestId("icon").parentElement!;
    expect(bgDiv).toHaveClass("bg-[#46C691]");
  });

  it("에러 타입일 때 red 배경을 적용합니다.", () => {
    render(<Toast message="에러 발생" type="error" />);
    const bgDiv = screen.getByTestId("icon").parentElement!;
    expect(bgDiv).toHaveClass("bg-[#FF4242]");
  });

  it("경고 타입일 때 yellow 배경을 적용합니다.", () => {
    render(<Toast message="경고 메시지" type="warning" />);
    const bgDiv = screen.getByTestId("icon").parentElement!;
    expect(bgDiv).toHaveClass("bg-[#FFC642]");
  });

  it("알 수 없는 타입은 success로 폴백합니다.", () => {
    render(<Toast message="기본" type={"unknown" as any} />);
    const bgDiv = screen.getByTestId("icon").parentElement!;
    expect(bgDiv).toHaveClass("bg-[#46C691]");
  });

  it("Icon에 이름과 크기가 전달됩니다.", () => {
    render(<Toast message="아이콘 테스트" type="error" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("name", "Error");
    expect(icon).toHaveAttribute("size", "20");
  });
});
