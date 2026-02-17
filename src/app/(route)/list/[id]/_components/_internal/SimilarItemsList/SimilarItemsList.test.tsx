import { render, screen } from "@testing-library/react";
import SimilarItem from "./SimilarItemsList";

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
    render(<SimilarItem />);

    const similarItemElement = screen.getByTestId("list-item-image");
    expect(similarItemElement).toBeInTheDocument();
  });

  it("제목이 렌더링되어야 한다.", () => {
    render(<SimilarItem />);

    const similarItemElement = screen.getByText("게시글 제목");
    expect(similarItemElement).toBeInTheDocument();
  });

  it("위치가 렌더링되어야 한다.", () => {
    render(<SimilarItem />);

    const similarItemElement = screen.getByText(/노원구/);
    expect(similarItemElement).toBeInTheDocument();
  });

  it("시간이 렌더링되어야 한다.", () => {
    render(<SimilarItem />);

    const similarItemElement = screen.getByText("30분 전");
    expect(similarItemElement).toBeInTheDocument();
  });
});
