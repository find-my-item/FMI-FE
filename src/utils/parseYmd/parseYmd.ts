/**
 * @author suhyeon
 * YYYY-MM-DD 형태의 문자열을 YmdDate 객체로 파싱하는 유틸함수입니다.
 *
 * URL query parameter로 전달되는 날짜 문자열을 검증하고
 * `{ year, month, day }` 형태의 객체로 변환합니다.
 *
 * 허용 형식
 * - YYYY-MM-DD
 * - YYYY-M-D
 *
 * 검증 항목
 * - 문자열 형식 검사 (정규식)
 * - month: 1~12 범위
 * - day: 1~31 범위
 *
 * 형식이 올바르지 않거나 범위를 벗어나는 경우 `null`을 반환한다.
 *
 * @param originQueryDate - URL query에서 전달된 날짜 문자열
 *
 * @returns 파싱된 YmdDate 객체 또는 null
 *
 * @example
 * parseYmd("2026-03-05")
 * // { year: 2026, month: 3, day: 5 }
 *
 * @example
 * parseYmd("invalid")
 * // null
 */

export const parseYmd = (originQueryDate: string | null) => {
  if (!originQueryDate) return null;

  const DateArray = originQueryDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!DateArray) return null;

  const year = Number(DateArray[1]);
  const month = Number(DateArray[2]);
  const day = Number(DateArray[3]);

  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
};
