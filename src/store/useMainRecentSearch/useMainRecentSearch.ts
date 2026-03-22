import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT_SEARCH_COUNT = 10;

const normalizeKeyword = (keyword: string) => keyword.trim();

/**
 * 메인페이지 검색에서 사용하는 최근 검색어 전역 상태 스토어입니다.
 *
 * @author hyungjun
 * @description
 * - `persist`로 `recentKeywords`를 로컬 스토리지에 저장합니다.
 * - 동일한 검색어를 다시 추가하면 목록 앞으로 옮기며 중복을 제거합니다.
 * - 최대 개수는 `MAX_RECENT_SEARCH_COUNT`를 넘지 않도록 잘라냅니다.
 * - 빈 문자열·공백만 있는 입력은 추가하지 않습니다.
 *
 * @example
 * ```ts
 * const { recentKeywords, addRecentSearch, removeRecentSearch, clearRecentSearch } =
 *   useMainRecentSearch();
 * addRecentSearch("열쇠");
 * ```
 */

interface MainRecentSearchStore {
  recentKeywords: string[];
  addRecentSearch: (keyword: string) => void;
  removeRecentSearch: (keyword: string) => void;
  clearRecentSearch: () => void;
}

export const useMainRecentSearch = create<MainRecentSearchStore>()(
  persist(
    (set, get) => ({
      recentKeywords: [],
      addRecentSearch: (keyword) => {
        const trimmed = normalizeKeyword(keyword);
        if (!trimmed) return;

        set(() => {
          const prev = get().recentKeywords;
          const withoutDup = prev.filter((k) => k !== trimmed);
          const next = [trimmed, ...withoutDup].slice(0, MAX_RECENT_SEARCH_COUNT);
          return { recentKeywords: next };
        });
      },
      removeRecentSearch: (keyword) => {
        const trimmed = normalizeKeyword(keyword);
        if (!trimmed) return;

        set({
          recentKeywords: get().recentKeywords.filter((k) => k !== trimmed),
        });
      },
      clearRecentSearch: () => set({ recentKeywords: [] }),
    }),
    {
      name: "main-recent-search",
      partialize: (state) => ({ recentKeywords: state.recentKeywords }),
    }
  )
);
