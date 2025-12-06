import { render, screen } from "@testing-library/react";
import Chip from "./Chip";

describe("Chip", () => {
  it("type을 전달하지 않으면 기본값(status) 스타일이 적용됩니다", () => {
    render(<Chip label="전자기기" />);
    const element = screen.getByText("전자기기");
    expect(element).toHaveClass("bg-flatGreen-75 text-flatGreen-500");
  });

  it("type이 status일 때 라벨이 STATUS로 렌더링됩니다", () => {
    render(<Chip label="전자기기" type="status" />);
    expect(screen.getByText("전자기기")).toBeInTheDocument();
  });

  it("type이 category일 때 라벨이 CATEGORY로 렌더링됩니다", () => {
    render(<Chip label="전자기기" type="category" />);
    expect(screen.getByText("전자기기")).toBeInTheDocument();
  });

  it("type이 status일 때 배경색, 텍스트 컬러가 bg-flatGreen-75 text-flatGreen-500 렌더링됩니다", () => {
    render(<Chip label="전자기기" type="status" />);
    expect(screen.getByText("전자기기")).toHaveClass("bg-flatGreen-75 text-flatGreen-500");
  });

  it("type이 category일 때 배경색, 텍스트 컬러가 bg-flatGray-25 text-flatGray-500 렌더링됩니다", () => {
    render(<Chip label="전자기기" type="category" />);
    expect(screen.getByText("전자기기")).toHaveClass("bg-flatGray-25 text-flatGray-500");
  });
});
