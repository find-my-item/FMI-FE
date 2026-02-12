import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useRegionRows from "./useRegionRows";
import { loadRegionRows } from "@/utils";
import { RegionRow } from "@/types";
import { createElement, ReactNode } from "react";

jest.mock("@/utils", () => ({
  loadRegionRows: jest.fn(),
}));

const mockedLoadRegionRows = loadRegionRows as jest.MockedFunction<typeof loadRegionRows>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useRegionRows", () => {
  beforeEach(() => {
    mockedLoadRegionRows.mockReset();
  });

  it("마운트 시 지역 목록을 불러오고 성공하면 regions를 세팅한다", async () => {
    const rows: RegionRow[] = [
      {
        sido: "서울",
        sigungu: "강남구",
        location: "삼성동",
        display: "서울 강남구 삼성동",
      },
      {
        sido: "부산",
        sigungu: "해운대구",
        location: "우동",
        display: "부산 해운대구 우동",
      },
    ];

    mockedLoadRegionRows.mockResolvedValue(rows as any);

    const { result } = renderHook(() => useRegionRows(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.regions).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.regions).toEqual(rows);
  });

  it("마운트 시 로딩에 실패하면 isError/error를 세팅하고 regions는 빈 배열이다", async () => {
    const error = new Error("boom");
    mockedLoadRegionRows.mockRejectedValue(error);

    const { result } = renderHook(() => useRegionRows(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(error);
    expect(result.current.regions).toEqual([]);
  });

  it("refetch를 호출하면 다시 로딩하고 최신 데이터로 regions를 갱신한다", async () => {
    const first: RegionRow[] = [
      {
        sido: "서울",
        sigungu: "서초구",
        location: "반포동",
        display: "서울 서초구 반포동",
      },
    ];
    const second: RegionRow[] = [
      {
        sido: "경기",
        sigungu: "성남시",
        location: "분당구",
        display: "경기 성남시 분당구",
      },
    ];

    mockedLoadRegionRows.mockResolvedValueOnce(first as any).mockResolvedValueOnce(second as any);

    const { result } = renderHook(() => useRegionRows(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.regions).toEqual(first);

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.regions).toEqual(second);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
