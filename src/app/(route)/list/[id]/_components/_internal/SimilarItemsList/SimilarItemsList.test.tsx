import { render, screen } from "@testing-library/react";
import SimilarItemsList from "./SimilarItemsList";
import { MOCK_SIMILAR_POST_ITEMS } from "@/mock/data";

jest.mock("@/components/common/ListItemImage/ListItemImage", () => {
  return {
    __esModule: true,
    default: ({ src, alt, size }: { src: string; alt: string; size: number }) => (
      <img data-testid="list-item-image" src={src} alt={alt} width={size} height={size} />
    ),
  };
});

describe("비슷한 분실물 아이템", () => {
  it("비슷한 분실물 아이템 이미지가 렌더링되어야 한다.", () => {
    render(<SimilarItemsList data={[MOCK_SIMILAR_POST_ITEMS]} />);

    const similarItemElement = screen.getByTestId("list-item-image");
    expect(similarItemElement).toBeInTheDocument();
  });

  it("제목이 렌더링되어야 한다.", () => {
    render(<SimilarItemsList data={[MOCK_SIMILAR_POST_ITEMS]} />);

    const similarItemElement = screen.getByText("아이폰 15 분실");
    expect(similarItemElement).toBeInTheDocument();
  });

  it("위치가 렌더링되어야 한다.", () => {
    render(<SimilarItemsList data={[MOCK_SIMILAR_POST_ITEMS]} />);

    const similarItemElement = screen.getByText(/서울시/);
    expect(similarItemElement).toBeInTheDocument();
  });

  it("시간이 렌더링되어야 한다.", () => {
    render(<SimilarItemsList data={[MOCK_SIMILAR_POST_ITEMS]} />);

    const similarItemElement = screen.getByText("2025.12.26");
    expect(similarItemElement).toBeInTheDocument();
  });
});
