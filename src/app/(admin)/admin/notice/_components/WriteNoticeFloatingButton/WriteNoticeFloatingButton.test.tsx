import { render, screen } from "@testing-library/react";
import WriteNoticeFloatingButton from "./WriteNoticeFloatingButton";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe("WriteNoticeFloatingButton", () => {
  it("링크 렌더링", () => {
    render(<WriteNoticeFloatingButton />);

    const link = screen.getByRole("link", { name: "공지사항 작성" });
    expect(link).toBeInTheDocument();
  });

  it("공지 작성 페이지 href 확인", () => {
    render(<WriteNoticeFloatingButton />);

    const link = screen.getByRole("link", { name: "공지사항 작성" });
    expect(link).toHaveAttribute("href", "/admin/write/notice");
  });
});
