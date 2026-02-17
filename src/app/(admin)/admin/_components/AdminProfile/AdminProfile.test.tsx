import { render, screen } from "@testing-library/react";
import AdminProfile from "./AdminProfile";

jest.mock("next/link", () => {
  return ({ href, children, ...rest }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname} {...rest}>
      {children}
    </a>
  );
});

jest.mock("@/components/common", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="icon" data-name={name} data-size={size} />
  ),
  Button: ({ children, as: Component = "button", ...props }: any) => {
    return (
      <Component data-testid="button" {...props}>
        {children}
      </Component>
    );
  },
}));

describe("AdminProfile", () => {
  it("관리자 정보, 프로필 수정 버튼 렌더", () => {
    render(<AdminProfile />);

    expect(screen.getByText("찾아줘 관리자")).toBeInTheDocument();
    expect(screen.getByText("admin@gmail.com")).toBeInTheDocument();

    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-name", "AdminLogo");
    expect(icon).toHaveAttribute("data-size", "50");

    const buttonLink = screen.getByRole("link", { name: "관리자 프로필 수정" });
    expect(buttonLink).toHaveAttribute("href", "/admin/profile");
    expect(buttonLink).toHaveAttribute("aria-label", "관리자 프로필 수정");
  });
});
