import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItem from "./ListItem";
import { MOCK_POST_ITEM } from "@/mock/MOCK_DATA";
import { getItemCategoryLabel, getItemStatusLabel } from "@/utils";

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
  it("list: 타이틀/설명/배지/칩/아이콘/이미지와 올바른 링크를 렌더링합니다", () => {
    render(<ListItem post={MOCK_POST_ITEM} linkState="list" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/list/${MOCK_POST_ITEM.postId}`);

    expect(screen.getByText(MOCK_POST_ITEM.title)).toBeInTheDocument();
    expect(screen.getByText(MOCK_POST_ITEM.summary)).toBeInTheDocument();

    expect(screen.getByTestId("chip-status")).toHaveTextContent(
      getItemStatusLabel(MOCK_POST_ITEM.itemStatus)
    );
    expect(screen.getByTestId("chip-category")).toHaveTextContent(
      getItemCategoryLabel(MOCK_POST_ITEM.category)
    );

    expect(screen.getByTestId("badge-new")).toBeInTheDocument();

    const starIcon = screen.getByTestId("icon-Star");
    expect(starIcon.parentElement).toHaveTextContent(String(MOCK_POST_ITEM.favoriteCount));

    // TODO(지권): 백엔드 API 누락
    // const eyeIcon = screen.getByTestId("icon-Eye");
    // expect(eyeIcon.parentElement).toHaveTextContent(String(MOCK_POST_ITEM.viewCount));

    const img = screen.getByAltText("아이템 이미지") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src") || "").toContain("https://picsum.photos/400/300?random=1");
  });
});
