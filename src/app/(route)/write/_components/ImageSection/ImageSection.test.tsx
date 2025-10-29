import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageSection from "./ImageSection";

jest.mock("@/components", () => ({
  Icon: ({ title }: { title: string }) => <span data-testid={`icon-${title}`}>{title}</span>,
}));

describe("ImageSection", () => {
  it("섹션이 렌더링되어야 한다", () => {
    render(<ImageSection />);
    expect(screen.getByLabelText("이미지 업로드")).toBeInTheDocument();
  });

  it("카메라 아이콘과 (0/5) 텍스트가 보여야 한다", () => {
    render(<ImageSection />);
    expect(screen.getByTestId("icon-이미지 업로드")).toBeInTheDocument();
    expect(screen.getByText("(0/5)")).toBeInTheDocument();
  });

  it("안내 문구가 보여야 한다", () => {
    render(<ImageSection />);
    expect(screen.getByText("* 사진은 최대 5장 첨부가 가능합니다. (선택)")).toBeInTheDocument();
  });

  it("박스를 클릭하면 숨겨진 file input의 click이 호출되어야 한다", async () => {
    const { container } = render(<ImageSection />);
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, "click");

    const clickableBox = screen.getByTestId("icon-이미지 업로드").parentElement as HTMLElement;
    await userEvent.click(clickableBox);

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("file input은 이미지 확장자만 허용해야 한다", () => {
    const { container } = render(<ImageSection />);
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toHaveAttribute("accept", "image/*");
  });
});
