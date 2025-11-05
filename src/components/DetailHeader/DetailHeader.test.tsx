import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailHeader from "@/components/DetailHeader/DetailHeader";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

// 기본 상태 테스트
test("기본 상태인 title, 뒤로가기 버튼 렌더링 여부 확인", () => {
  render(<DetailHeader title="테스트 제목" />);
  expect(screen.getByText("테스트 제목")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /뒤로가기/i })).toBeInTheDocument();
});

// 컴파운드 버튼 테스트
test("내부 컴파운드 버튼 렌더링 여부 확인 및 클릭 시 이벤트 호출 확인", async () => {
  const user = userEvent.setup();
  const handleSearch = jest.fn();

  render(
    <DetailHeader title="테스트">
      <DetailHeader.Search onClick={handleSearch} />
    </DetailHeader>
  );

  await user.click(screen.getByRole("button", { name: "검색" }));
  expect(handleSearch).toHaveBeenCalled();
});

// Save 버튼 테스트
test("Save 버튼 disabled/활성화에 따라 클래스가 바뀌는지 확인", () => {
  render(<DetailHeader.Save disabled />);
  expect(screen.getByText("저장")).toHaveClass("text-[#98E3BD]");
});
