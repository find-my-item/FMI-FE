import { render, screen } from "@testing-library/react";
import SimilarItem from "./SimilarItem";

describe("비슷한 분실물 아이템", () => {
  // TODO(지권): 이미지 태그 변경 후 테스트 코드 추가
  // it("비슷한 분실물 아이템 이미지가 렌더링되어야 한다.", () => {
  //   render(<SimilarItem />);

  //   const similarItemElement = screen.getByText("이미지");
  //   expect(similarItemElement).toBeInTheDocument();
  // });

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
