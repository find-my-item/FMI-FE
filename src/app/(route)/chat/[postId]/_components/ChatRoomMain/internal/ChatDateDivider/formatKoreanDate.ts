// 한국 시간대(UTC+9) 기준으로 날짜를 계산하는 헬퍼 함수
const getKSTDateInfo = (isoString: string) => {
  // ISO 문자열을 파싱 (서버에서 UTC로 보내는 경우를 가정)
  const date = new Date(isoString);

  // formatDate 유틸리티와 동일한 방식으로 처리
  // ISO 문자열에 타임존 정보가 없으면 'Z'를 추가해서 UTC로 해석
  let targetDate: Date;
  if (isoString.includes("Z") || isoString.includes("+") || isoString.includes("-", 10)) {
    targetDate = new Date(isoString);
  } else {
    targetDate = new Date(`${isoString}Z`);
  }

  // 로컬 타임존 기준으로 날짜 계산 (한국이면 자동으로 KST 적용)
  // new Date()는 이미 로컬 타임존으로 변환하므로 추가 변환 불필요
  return {
    year: targetDate.getFullYear(),
    month: targetDate.getMonth(),
    date: targetDate.getDate(),
    day: targetDate.getDay(),
  };
};

export const formatKoreanDate = (isoString: string) => {
  const { year, month, date, day } = getKSTDateInfo(isoString);

  const monthStr = String(month + 1).padStart(2, "0");
  const dateStr = String(date).padStart(2, "0");

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const weekday = weekdays[day];

  return `${year}.${monthStr}.${dateStr} ${weekday}`;
};

export const getDateKey = (isoString: string) => {
  const { year, month, date } = getKSTDateInfo(isoString);
  return `${year}-${month}-${date}`;
};
