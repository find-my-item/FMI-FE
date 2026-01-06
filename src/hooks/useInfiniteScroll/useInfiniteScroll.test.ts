import { renderHook, waitFor } from "@testing-library/react";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { useInView } from "react-intersection-observer";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("useInfiniteScroll", () => {
  const mockFetchNextPage = jest.fn();
  const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("요소가 뷰포트에 들어오고, 다음 페이지가 있으며, 로딩 중이 아닐 때 fetchNextPage를 호출해야 한다", async () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
      entry: null,
      refCallback: jest.fn(),
    });

    const { result } = renderHook(() =>
      useInfiniteScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
      })
    );

    await waitFor(() => {
      expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
    });

    expect(result.current.ref).toBeDefined();
  });

  it("요소가 뷰포트에 들어오지 않으면 fetchNextPage를 호출하지 않아야 한다", async () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
      entry: null,
      refCallback: jest.fn(),
    });

    renderHook(() =>
      useInfiniteScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
      })
    );

    await waitFor(() => {
      expect(mockFetchNextPage).not.toHaveBeenCalled();
    });
  });

  it("다음 페이지가 없으면 fetchNextPage를 호출하지 않아야 한다", async () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
      entry: null,
      refCallback: jest.fn(),
    });

    renderHook(() =>
      useInfiniteScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false,
      })
    );

    await waitFor(() => {
      expect(mockFetchNextPage).not.toHaveBeenCalled();
    });
  });

  it("현재 다음 페이지를 가져오는 중이면 fetchNextPage를 호출하지 않아야 한다", async () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
      entry: null,
      refCallback: jest.fn(),
    });

    renderHook(() =>
      useInfiniteScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: true,
      })
    );

    await waitFor(() => {
      expect(mockFetchNextPage).not.toHaveBeenCalled();
    });
  });

  it("hasNextPage가 undefined일 때도 fetchNextPage를 호출하지 않아야 한다", async () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
      entry: null,
      refCallback: jest.fn(),
    });

    renderHook(() =>
      useInfiniteScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: undefined,
        isFetchingNextPage: false,
      })
    );

    await waitFor(() => {
      expect(mockFetchNextPage).not.toHaveBeenCalled();
    });
  });

  it("inViewOptions를 전달하면 useInView에 옵션이 전달되어야 한다", () => {
    const customOptions = { threshold: 0.5 };
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
      entry: null,
      refCallback: jest.fn(),
    });

    renderHook(() =>
      useInfiniteScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
        inViewOptions: customOptions,
      })
    );

    expect(mockUseInView).toHaveBeenCalledWith(customOptions);
  });

  it("inViewOptions를 전달하지 않으면 기본값(threshold: 0)이 사용되어야 한다", () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
      entry: null,
      refCallback: jest.fn(),
    });

    renderHook(() =>
      useInfiniteScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
      })
    );

    expect(mockUseInView).toHaveBeenCalledWith({ threshold: 0 });
  });
});
