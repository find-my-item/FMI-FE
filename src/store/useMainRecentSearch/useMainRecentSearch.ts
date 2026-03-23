import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT_SEARCH_COUNT = 10;

const normalizeKeyword = (keyword: string) => keyword.trim();

export type MainRecentSearchItem = {
  keyword: string;
  /** 검색 실행 시각 (ISO 8601, 로컬스토리지에 저장) */
  searchedAt: string;
};

type PersistedLegacyV0 = {
  recentKeywords?: string[];
  recentItems?: MainRecentSearchItem[];
};

/**
 * 메인페이지 검색에서 사용하는 최근 검색어 전역 상태 스토어입니다.
 *
 * @author hyungjun
 * @description
 * - `persist`로 `recentItems`를 로컬 스토리지에 저장합니다.
 * - 각 항목은 `keyword`와 검색 시각 `searchedAt`(ISO 문자열)을 가집니다.
 * - 동일한 검색어를 다시 추가하면 목록 앞으로 옮기며 `searchedAt`을 갱신합니다.
 * - 최대 개수는 `MAX_RECENT_SEARCH_COUNT`를 넘지 않도록 잘라냅니다.
 * - 빈 문자열·공백만 있는 입력은 추가하지 않습니다.
 * - 구버전(`recentKeywords`만 저장) 데이터는 마이그레이션으로 `recentItems`로 변환합니다.
 *
 * @example
 * ```ts
 * const { recentItems, addRecentSearch, removeRecentSearch, clearRecentSearch } =
 *   useMainRecentSearch();
 * addRecentSearch("열쇠");
 * ```
 */

interface MainRecentSearchStore {
  recentItems: MainRecentSearchItem[];
  addRecentSearch: (keyword: string) => void;
  removeRecentSearch: (keyword: string) => void;
  clearRecentSearch: () => void;
}

export const useMainRecentSearch = create<MainRecentSearchStore>()(
  persist(
    (set, get) => ({
      recentItems: [],
      addRecentSearch: (keyword) => {
        const trimmed = normalizeKeyword(keyword);
        if (!trimmed) return;

        const searchedAt = new Date().toISOString();

        set(() => {
          const prev = get().recentItems;
          const withoutDup = prev.filter((item) => item.keyword !== trimmed);
          const next = [{ keyword: trimmed, searchedAt }, ...withoutDup].slice(
            0,
            MAX_RECENT_SEARCH_COUNT
          );
          return { recentItems: next };
        });
      },
      removeRecentSearch: (keyword) => {
        const trimmed = normalizeKeyword(keyword);
        if (!trimmed) return;

        set({
          recentItems: get().recentItems.filter((item) => item.keyword !== trimmed),
        });
      },
      clearRecentSearch: () => set({ recentItems: [] }),
    }),
    {
      name: "main-recent-search",
      version: 1,
      migrate: (persistedState, version): Pick<MainRecentSearchStore, "recentItems"> => {
        if (version === 0) {
          const legacy = persistedState as PersistedLegacyV0 | undefined;
          if (legacy?.recentItems && Array.isArray(legacy.recentItems)) {
            return { recentItems: legacy.recentItems };
          }
          if (legacy?.recentKeywords && Array.isArray(legacy.recentKeywords)) {
            const fallbackAt = new Date().toISOString();
            return {
              recentItems: legacy.recentKeywords.map((k) => ({
                keyword: k,
                searchedAt: fallbackAt,
              })),
            };
          }
        }
        const next = persistedState as Pick<MainRecentSearchStore, "recentItems"> | undefined;
        return { recentItems: next?.recentItems ?? [] };
      },
      partialize: (state) => ({ recentItems: state.recentItems }),
    }
  )
);
