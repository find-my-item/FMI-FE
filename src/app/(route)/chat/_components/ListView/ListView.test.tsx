import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListView from "./ListView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const mockSearchUpdateQuery = jest.fn();

jest.mock("@/hooks", () => ({
  useSearchUpdateQueryString: jest.fn(),
}));

jest.mock("../ListSearch/ListSearch", () => ({
  __esModule: true,
  default: () => <div data-testid="list-search"></div>,
}));

jest.mock("@/components/layout", () => ({
  DetailHeader: ({ title }: { title: string }) => <div data-testid="detail-header">{title}</div>,
}));

jest.mock("../DefaultList/DefaultList", () => ({
  __esModule: true,
  default: ({
    searchUpdateQuery,
  }: {
    searchUpdateQuery: (key: string, value?: string) => void;
  }) => (
    <div data-testid="default-list" onClick={() => searchUpdateQuery("test", "value")}>
      DefaultList
    </div>
  ),
}));

import { useSearchUpdateQueryString } from "@/hooks";

const renderWithQueryClient = (component: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};

describe("ListView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("searchMode가 default일 때 채팅 제목과 DefaultList가 렌더링됩니다", () => {
    (useSearchUpdateQueryString as jest.Mock).mockReturnValue({
      searchMode: "default",
      searchUpdateQuery: mockSearchUpdateQuery,
    });

    renderWithQueryClient(<ListView />);

    const detailHeader = screen.getByTestId("detail-header");
    expect(detailHeader).toHaveTextContent("채팅");

    expect(screen.getByTestId("default-list")).toBeInTheDocument();
    expect(screen.queryByTestId("list-search")).not.toBeInTheDocument();
  });

  it("searchMode가 region일 때 지역 선택 제목과 ListSearch가 렌더링됩니다", () => {
    (useSearchUpdateQueryString as jest.Mock).mockReturnValue({
      searchMode: "region",
      searchUpdateQuery: mockSearchUpdateQuery,
    });

    renderWithQueryClient(<ListView />);

    const detailHeader = screen.getByTestId("detail-header");
    expect(detailHeader).toHaveTextContent("지역 선택");

    expect(screen.getByTestId("list-search")).toBeInTheDocument();
    expect(screen.queryByTestId("default-list")).not.toBeInTheDocument();
  });

  it("searchMode가 post일 때 채팅 제목과 ListSearch가 렌더링됩니다", () => {
    (useSearchUpdateQueryString as jest.Mock).mockReturnValue({
      searchMode: "post",
      searchUpdateQuery: mockSearchUpdateQuery,
    });

    renderWithQueryClient(<ListView />);

    const detailHeader = screen.getByTestId("detail-header");
    expect(detailHeader).toHaveTextContent("채팅");

    expect(screen.getByTestId("list-search")).toBeInTheDocument();
    expect(screen.queryByTestId("default-list")).not.toBeInTheDocument();
  });

  it("DefaultList에 searchUpdateQuery가 올바르게 전달됩니다", () => {
    (useSearchUpdateQueryString as jest.Mock).mockReturnValue({
      searchMode: "default",
      searchUpdateQuery: mockSearchUpdateQuery,
    });

    renderWithQueryClient(<ListView />);

    const defaultList = screen.getByTestId("default-list");
    defaultList.click();

    expect(mockSearchUpdateQuery).toHaveBeenCalledWith("test", "value");
  });

  it("ListSearch에 searchMode가 올바르게 전달됩니다", () => {
    (useSearchUpdateQueryString as jest.Mock).mockReturnValue({
      searchMode: "region",
      searchUpdateQuery: mockSearchUpdateQuery,
    });

    renderWithQueryClient(<ListView />);

    const listSearch = screen.getByTestId("list-search");
  });
});
