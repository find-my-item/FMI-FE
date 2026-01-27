import { render, screen } from "@testing-library/react";
import UserProfileDetailHeader from "./UserProfileDetailHeader";

jest.mock("@/components/layout", () => {
  const DetailHeader = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );

  DetailHeader.Menu = ({ ariaLabel }: { ariaLabel: string }) => (
    <button aria-label={ariaLabel}>Menu</button>
  );

  return { DetailHeader };
});

describe("UserProfileDetailHeader", () => {
  it("DetailHeader.Menu의 ariaLabel이 '더보기 메뉴'로 설정되어야 합니다", () => {
    render(<UserProfileDetailHeader />);
    const menu = screen.getByRole("button", { name: "더보기 메뉴" });
    expect(menu).toBeInTheDocument();
  });
});
