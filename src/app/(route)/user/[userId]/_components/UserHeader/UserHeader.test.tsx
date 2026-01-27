import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserHeader from "./UserHeader";
import { MOCK_USER_PROFILE } from "@/mock/data";

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
  it("프로필 이미지가 표시되어야 합니다", () => {
    render(<UserHeader data={MOCK_USER_PROFILE} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("프로필 이미지가 없을 경우 대체 이미지가 표시되어야 합니다.", () => {
    render(<UserHeader data={{ nickname: "test", profileImg: "" }} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/test_list.JPG");
  });

  it("닉네임이 표시되어야 합니다", () => {
    render(<UserHeader data={MOCK_USER_PROFILE} />);
    expect(screen.getByText(MOCK_USER_PROFILE.nickname)).toBeInTheDocument();
  });

  it("닉네임이 없을 경우 로딩 중...이 표시되어야 합니다", () => {
    render(<UserHeader data={{ nickname: "", profileImg: "" }} />);
    expect(screen.getByText("로딩 중..."));
  });
});
