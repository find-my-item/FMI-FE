import { act, renderHook, waitFor } from "@testing-library/react";
import useRegionRows from "./useRegionRows";
import { loadRegionRows } from "@/utils";
import { RegionRow } from "@/types";

jest.mock("@/utils", () => ({
  loadRegionRows: jest.fn(),
}));

const mockedLoadRegionRows = loadRegionRows as jest.MockedFunction<typeof loadRegionRows>;

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

    const { result } = renderHook(() => useRegionRows());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.regions).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedLoadRegionRows).toHaveBeenCalledTimes(1);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.regions).toEqual(rows);
  });

  it("마운트 시 로딩에 실패하면 isError/error를 세팅하고 regions를 비운다", async () => {
    mockedLoadRegionRows.mockRejectedValue(new Error("boom"));

    const { result } = renderHook(() => useRegionRows());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedLoadRegionRows).toHaveBeenCalledTimes(1);
    expect(result.current.regions).toEqual([]);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("boom");
  });

  it("Error가 아닌 값으로 reject 되면 기본 에러 메시지로 래핑한다", async () => {
    mockedLoadRegionRows.mockRejectedValue("not-error" as any);

    const { result } = renderHook(() => useRegionRows());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("지역 정보를 불러오는데 실패했습니다.");
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

    const { result } = renderHook(() => useRegionRows());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.regions).toEqual(first);
    expect(mockedLoadRegionRows).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.regions).toEqual(second);
    });

    expect(mockedLoadRegionRows).toHaveBeenCalledTimes(2);
    expect(result.current.regions).toEqual(second);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("refetch 중 실패하면 regions를 비우고 error를 세팅한다", async () => {
    const first: RegionRow[] = [
      {
        sido: "서울",
        sigungu: "송파구",
        location: "잠실동",
        display: "서울 송파구 잠실동",
      },
    ];

    mockedLoadRegionRows
      .mockResolvedValueOnce(first as any)
      .mockRejectedValueOnce(new Error("refetch-fail"));

    const { result } = renderHook(() => useRegionRows());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.regions).toEqual(first);

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.regions).toEqual([]);
    expect(result.current.isError).toBe(true);
    expect(result.current.error?.message).toBe("refetch-fail");
    expect(mockedLoadRegionRows).toHaveBeenCalledTimes(2);
  });
});
