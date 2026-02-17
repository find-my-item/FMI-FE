import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import GuestInquiriesList from "./GuestInquiriesList";

jest.mock("@/app/ErrorBoundary", () => ({
  ErrorBoundary: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    Suspense: ({ children }: { children: ReactNode }) => <>{children}</>, // fallback 무시하고 children만 렌더
  };
});

jest.mock("@/components/state", () => ({
  LoadingState: () => <div>loading...</div>,
  EmptyState: () => <div>empty...</div>,
}));

jest.mock("../../../_utils/toReportsItemVM/toReportsItemVM", () => ({
  toGuestInquiryItemVM: (v: any) => v,
}));

jest.mock("../../../_components", () => ({
  AdminReportsItem: () => <li data-testid="guest-inquiry-item" />,
}));

describe("GuestInquiriesList", () => {
  it("섹션 렌더링", () => {
    render(<GuestInquiriesList />);
    expect(screen.getByRole("region", { name: "비회원 문의 목록" })).toBeInTheDocument();
  });

  it("비회원 문의 아이템이 5개 렌더링", () => {
    render(<GuestInquiriesList />);
    expect(screen.getAllByTestId("guest-inquiry-item")).toHaveLength(5);
  });
});
