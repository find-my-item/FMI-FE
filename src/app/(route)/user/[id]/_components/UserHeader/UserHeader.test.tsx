import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserHeader from "./UserHeader";

jest.mock("@/components/common", () => ({
  Icon: ({ name, size, className }: any) => (
    <svg data-testid="icon" data-name={name} data-size={size} className={className} />
  ),
}));

const mockData = {
  nickname: "홍길동",
  email: "test@example.com",
};

describe("UserHeader", () => {
  it("닉네임과 이메일이 표시되어야 합니다", () => {
    render(<UserHeader data={mockData} />);
    expect(screen.getByText(mockData.nickname)).toBeInTheDocument();
    expect(screen.getByText(mockData.email)).toBeInTheDocument();
  });
});
