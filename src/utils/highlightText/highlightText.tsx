/**
 * @author jikwon
 *
 * @description
 * 검색어와 일치하는 텍스트 부분을 강조 표시합니다.
 * 일치하는 문자열은 span으로 감싸 하이라이트 스타일이 적용됩니다.
 *
 * @param text 원본 전체 텍스트
 * @param keyword keyword 검색어
 *
 * @example
 * <h2>
 *   {keyword ? highlightText(post.summary, keyword) : post.summary}
 * </h2>
 */

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const highlightText = (text: string, keyword: string) => {
  if (!keyword) return text;

  const escaped = escapeRegex(keyword);
  const regex = new RegExp(`(${escaped})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-brand-normal-default">
        {part}
      </span>
    ) : (
      part
    )
  );
};
