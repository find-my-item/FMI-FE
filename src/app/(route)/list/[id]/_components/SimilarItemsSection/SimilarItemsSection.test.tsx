import { render, screen } from "@testing-library/react";
import SimilarItemsSection from "./SimilarItemsSection";

describe("비슷한 분실물 섹션", () => {
  it("비슷한 분실물 섹션이 렌더링되어야 한다.", () => {
    render(<SimilarItemsSection />);

    const similarItemsSectionElement = screen.getByText("비슷한 분실물");
    expect(similarItemsSectionElement).toBeInTheDocument();
  });
});
