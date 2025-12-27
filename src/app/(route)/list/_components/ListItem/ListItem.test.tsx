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
    postId: 1,
    title: "아이폰 15 분실",
    summary: "서울 노원구 상계동 근처에서 아이폰을 잃어버렸습니다.",
    thumbnailUrl: "https://picsum.photos/400/300?random=1",
    address: "서울시 노원구 상계동",
    category: "ELECTRONICS",
    itemStatus: "SEARCHING",
    postType: "LOST",
    favoriteCount: 0,
    createdAt: "2025-12-26 10:22:58",
  } as const;

  it("list: 타이틀/설명/배지/칩/아이콘/이미지와 올바른 링크를 렌더링합니다", () => {
    render(<ListItem post={baseProps} linkState="list" />);

    // 링크
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/list/1");

    // 제목, 설명
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(screen.getByText(baseProps.summary)).toBeInTheDocument();

    // 칩(status/category)
    expect(screen.getByTestId("chip-status")).toHaveTextContent("찾는중");
    expect(screen.getByTestId("chip-category")).toHaveTextContent("전자기기");

    // 배지
    expect(screen.getByTestId("badge-new")).toBeInTheDocument();

    // 아이콘 및 카운트
    expect(screen.getByTestId("icon-Star")).toBeInTheDocument();
    expect(screen.getByTestId("icon-Eye")).toBeInTheDocument();
    // expect(screen.getByText("0")).toBeInTheDocument();
    // expect(screen.getByText("0")).toBeInTheDocument();

    // 이미지
    const img = screen.getByAltText("아이템 이미지") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src") || "").toContain("https://picsum.photos/400/300?random=1");
  });
});
