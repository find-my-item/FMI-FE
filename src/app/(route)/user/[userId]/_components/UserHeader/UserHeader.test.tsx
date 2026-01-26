import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserHeader from "./UserHeader";
import { MOCK_USER_PROFILE } from "@/mock/MOCK_DATA";

jest.mock("@/components/common", () => ({
  Icon: ({ name, size, className }: any) => (
    <svg data-testid="icon" data-name={name} data-size={size} className={className} />
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => <img src={src} alt="test" />,
}));

describe("UserHeader", () => {
  it("닉네임이 표시되어야 합니다", () => {
    render(<UserHeader data={MOCK_USER_PROFILE} />);
    expect(screen.getByText(MOCK_USER_PROFILE.nickname)).toBeInTheDocument();
  });
});
