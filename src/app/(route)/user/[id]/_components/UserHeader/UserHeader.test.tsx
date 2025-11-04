import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserHeader from "./UserHeader";

jest.mock("@/components", () => ({
  Icon: ({ name, size, className }: any) => (
    <svg data-testid="icon" data-name={name} data-size={size} className={className} />
  ),
}));

describe("UserHeader", () => {
  const nickname = "홍길동";
  const email = "test@example.com";

  it("닉네임과 이메일이 표시되어야 합니다", () => {
    render(<UserHeader nickname={nickname} email={email} />);
    expect(screen.getByText(nickname)).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
  });

  it("이메일 인증 아이콘이 표시되어야 합니다", () => {
    render(<UserHeader nickname={nickname} email={email} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-name", "ProfileCheck");
    expect(icon).toHaveAttribute("data-size", "20");
  });
});
