import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("variant가 new일 때 라벨이 NEW로 렌더링됩니다", () => {
    render(<Badge variant="new" />);
    expect(screen.getByText("N")).toBeInTheDocument();
  });

  it("variant가 hot일 때 라벨이 HOT로 렌더링됩니다", () => {
    render(<Badge variant="hot" />);
    expect(screen.getByText("H")).toBeInTheDocument();
  });

  it("variant가 new일 때 배경색이 #1EB87B로 렌더링됩니다", () => {
    render(<Badge variant="new" />);
    expect(screen.getByText("N")).toHaveClass("bg-[#1EB87B]");
  });

  it("variant가 hot일 때 배경색이 FF4242로 렌더링됩니다", () => {
    render(<Badge variant="hot" />);
    expect(screen.getByText("H")).toHaveClass("bg-[#FF4242]");
  });
});
