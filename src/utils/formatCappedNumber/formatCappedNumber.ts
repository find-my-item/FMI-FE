/**
 * @author jikwon
 *
 * 숫자를 포맷팅하여 문자열로 반환합니다.
 *
 * - `NaN` 값이 들어오면 `"0"`을 반환합니다.
 * - 지정한 상한값(`cap`)보다 큰 숫자는 `"cap+"` 형태로 표시됩니다.
 * - 그 외의 숫자는 미국식 천 단위 구분 기호(,)를 포함한 문자열로 반환됩니다.
 *
 * @param value - 포맷팅할 숫자 값입니다.
 * @param cap - 표시할 최대 숫자입니다. 이 값보다 큰 경우 `"cap+"`로 표시됩니다. 기본값은 `9,999`입니다.
 * @returns 포맷된 숫자 문자열입니다.
 *
 * @example
 * ```ts
 * formatCappedNumber(1234); // "1,234"
 * formatCappedNumber(10000); // "9,999+"
 * formatCappedNumber(1500, 999); // "999+"
 * formatCappedNumber(NaN); // "0"
 * ```
 */
export const formatCappedNumber = (value: number, cap: number = 9999): string => {
  if (Number.isNaN(value)) return "0";

  if (value > cap) {
    return `${cap.toLocaleString("en-US")}+`;
  }

  return value.toLocaleString("en-US");
};
