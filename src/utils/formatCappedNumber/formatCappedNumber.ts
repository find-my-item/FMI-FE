/**
 *
 * @author jikwon
 *
 * 숫자를 포맷팅하여 문자열로 반환합니다.
 *
 * - `NaN` 값이 들어오면 `"0"`을 반환합니다.
 * - 9,999보다 큰 숫자는 `"9,999+"`로 표시됩니다.
 * - 그 외의 숫자는 미국식 천 단위 구분 기호(,)를 포함한 문자열로 반환됩니다.
 *
 * @param {number} value - 포맷팅할 숫자 값입니다.
 * @returns {string} 포맷된 숫자 문자열입니다.
 *
 * @example
 * ```ts
 * formatCappedNumber(1234); // "1,234"
 * formatCappedNumber(10000); // "9,999+"
 * formatCappedNumber(NaN); // "0"
 * ```
 */
export function formatCappedNumber(value: number): string {
  if (isNaN(value)) return "0";

  if (value > 9999) {
    return "9,999+";
  }

  return value.toLocaleString("en-US");
}
