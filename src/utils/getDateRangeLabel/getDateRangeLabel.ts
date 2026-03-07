import { formatYmdLabel, parseYmd } from "../parseDateFilter/parseDateFilter";

/**
 * @author suhyeon
 * 시작일과 종료일을 받아 포맷팅된 기간 레이블을 반환합니다.
 *
 * @param startDate - '2025-01-01' 형식 시작일
 * @param endDate - '2025-01-31' 형식 종료일
 *
 * @return 2025.01.01 ~ 2026.01.01 | "기간"
 */

export const getDateRangeLabel = (startDate?: string | null, endDate?: string | null): string => {
  const startDateObj = startDate ? parseYmd(startDate) : null;
  const endDateObj = endDate ? parseYmd(endDate) : null;

  const startLabel = startDateObj ? formatYmdLabel(startDateObj) : "";
  const endLabel = endDateObj ? formatYmdLabel(endDateObj) : "";

  return `${startLabel} ~ ${endLabel}` || "기간";
};
