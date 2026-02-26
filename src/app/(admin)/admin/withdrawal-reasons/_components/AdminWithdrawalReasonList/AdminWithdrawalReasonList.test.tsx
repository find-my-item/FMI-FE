import { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import AdminWithdrawalReasonList from "./AdminWithdrawalReasonList";
import { MOCK_WITHDRAW_REASON_LIST } from "@/mock/data";

jest.mock("@/utils", () => ({
  formatDate: (iso: string) => `formatted:${iso}`,
}));

jest.mock("@/components/state", () => ({
  LoadingState: () => <div>loading...</div>,
}));

jest.mock("@/app/ErrorBoundary", () => ({
  ErrorBoundary: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("AdminWithdrawalReasonList", () => {
  it("섹션 렌더링", () => {
    render(<AdminWithdrawalReasonList reason="" />);
    expect(screen.getByRole("region", { name: "유저 탈퇴 사유 목록" })).toBeInTheDocument();
  });

  it("mock 데이터 개수만큼 렌더링", () => {
    render(<AdminWithdrawalReasonList reason="" />);

    const region = screen.getByRole("region", { name: "유저 탈퇴 사유 목록" });
    const listItems = within(region).getAllByRole("listitem");

    const userItems = listItems.filter((li) => li.className.includes("border-b"));
    expect(userItems).toHaveLength(MOCK_WITHDRAW_REASON_LIST.length);
  });

  it("mock 데이터 내용 렌더링", () => {
    render(<AdminWithdrawalReasonList reason="" />);

    MOCK_WITHDRAW_REASON_LIST.forEach((item) => {
      expect(screen.getByRole("heading", { name: item.nickname })).toBeInTheDocument();
      expect(screen.getByText(item.email)).toBeInTheDocument();
      expect(screen.getByText(`formatted:${item.createdAt}`)).toBeInTheDocument();

      item.reasons.forEach((reason) => {
        expect(screen.getByText(`- ${reason}`)).toBeInTheDocument();
      });
    });
  });
});
