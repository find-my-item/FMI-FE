import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItem from "./ListItem";

jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

jest.mock("@/components", () => ({
  Icon: ({ name, ...rest }: any) => <span data-testid={`icon-${name}`} {...rest} />,
  Badge: ({ variant }: { variant: string }) => <span data-testid={`badge-${variant}`}>badge</span>,
  Chip: ({ label, type }: { label: string; type: string }) => (
    <span data-testid={`chip-${type}`}>{label}</span>
  ),
}));

describe("ListItem", () => {
  const baseProps = {
    id: 1,
    img: "/test_list.JPG",
    title: "게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목",
    description: "서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다",
  } as const;

  it("list: 타이틀/설명/배지/칩/아이콘/이미지와 올바른 링크를 렌더링합니다", () => {
    render(<ListItem {...baseProps} linkState="list" />);

    // 링크
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/list/1");

    // 제목, 설명
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();

    // 칩(status/category)
    expect(screen.getByTestId("chip-status")).toHaveTextContent("찾는중");
    expect(screen.getByTestId("chip-category")).toHaveTextContent("전자기기");

    // 배지
    expect(screen.getByTestId("badge-new")).toBeInTheDocument();

    // 아이콘 및 카운트
    expect(screen.getByTestId("icon-Star")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Eye")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();

    // 이미지
    const img = screen.getByAltText("아이템 이미지") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src") || "").toContain("/test_list.JPG");
  });
});
