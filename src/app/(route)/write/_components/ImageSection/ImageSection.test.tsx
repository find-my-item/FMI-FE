import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageSection from "./ImageSection";
import { ToastProvider } from "@/providers/ToastProviders";

const renderWithToast = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

jest.mock("@/components/common", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

describe("ImageSection", () => {
  it("섹션이 렌더링되어야 한다", () => {
    renderWithToast(<ImageSection />);
    expect(screen.getByLabelText("이미지 업로드")).toBeInTheDocument();
  });

  it("카메라 아이콘과 (0/5) 텍스트가 보여야 한다", () => {
    renderWithToast(<ImageSection />);
    expect(screen.getByTestId("icon-Camera")).toBeInTheDocument();
    expect(screen.getByText("(0/5)")).toBeInTheDocument();
  });

  it("안내 문구가 보여야 한다", () => {
    renderWithToast(<ImageSection />);
    expect(
      screen.getByText("최대 10MB, 총 5장의 이미지를 첨부할 수 있습니다. (jpg, jpeg, png)")
    ).toBeInTheDocument();
  });

  it("박스를 클릭하면 숨겨진 file input의 click이 호출되어야 한다", async () => {
    const { container } = renderWithToast(<ImageSection />);
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, "click");

    const clickableBox = screen.getByTestId("icon-Camera").parentElement as HTMLElement;
    await userEvent.click(clickableBox);

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("file input은 이미지 확장자만 허용해야 한다", () => {
    const { container } = renderWithToast(<ImageSection />);
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toHaveAttribute("accept", "image/png, image/jpeg, image/jpg");
  });
});
