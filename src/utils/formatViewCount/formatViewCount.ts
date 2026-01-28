/**
 * @author jikwon
 *
 * @description
 * 게시글 조회수 포맷팅 함수
 *
 * @param count - 조회수
 * @returns 포맷팅된 조회수
 *
 * @example
 * formatViewCount(1234); // "1.2천회"
 * formatViewCount(12345); // "1.2만회"
 * formatViewCount(123456); // "12만회"
 */
export const formatViewCount = (count: number): string => {
  if (count < 1_000) {
    return `${count}회`;
  }

  if (count < 10_000) {
    const value = count / 1_000;
    return `${Number.isInteger(value) ? value : value.toFixed(1)}천회`;
  }

  if (count < 1_000_000) {
    const value = count / 10_000;
    return `${Number.isInteger(value) ? value : value.toFixed(1)}만회`;
  }

  const value = Math.floor(count / 10_000);
  return `${value}만회`;
};
