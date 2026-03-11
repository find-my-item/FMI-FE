import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("variant가 new일 때 '최신 글' 라벨이 렌더링됩니다", () => {
    render(<Badge variant="new" />);

    const badge = screen.getByLabelText("최신 글");
    expect(badge).toBeInTheDocument();
  });

  it("variant가 hot일 때 '인기 글' 라벨이 렌더링됩니다", () => {
    render(<Badge variant="hot" />);

    const badge = screen.getByLabelText("인기 글");
    expect(badge).toBeInTheDocument();
  });

  it("variant가 new일 때 NewBadge 아이콘이 렌더링됩니다", () => {
    render(<Badge variant="new" />);

    const badge = screen.getByLabelText("최신 글");
    expect(badge.querySelector("svg")).toBeInTheDocument();
  });

  it("variant가 hot일 때 HotBadge 아이콘이 렌더링됩니다", () => {
    render(<Badge variant="hot" />);

    const badge = screen.getByLabelText("인기 글");
    expect(badge.querySelector("svg")).toBeInTheDocument();
  });
});
