/**
 * @author hyungjun
 *
 * @description
 * 날짜 문자열을 채팅용 시간 문자열('HH:mm')로 포맷팅하는 함수입니다.
 *
 * @param date - ISO 8601 형식 또는 파싱 가능한 날짜 문자열 (타임존 없으면 UTC로 해석)
 * @returns 'HH:mm' 형식의 시간 문자열. 파싱 실패 시 빈 문자열
 *
 * @example
 * formatChatTime("2025-02-09T14:30:00Z"); // "14:30"
 * formatChatTime("2025-02-09T09:05:00"); // "09:05"
 */

const formatChatTime = (date: string): string => {
  let targetDate: Date;

  if (date.includes("Z") || date.includes("+") || date.includes("-", 10)) {
    targetDate = new Date(date);
  } else {
    targetDate = new Date(`${date}Z`);
  }

  if (Number.isNaN(targetDate.getTime())) {
    return "";
  }

  const hours = String(targetDate.getHours()).padStart(2, "0");
  const minutes = String(targetDate.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default formatChatTime;
