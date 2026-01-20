const MS_IN_MINUTE = 60 * 1000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

const formatDate = (date: string) => {
  let targetDate: Date;

  if (date.includes("Z") || date.includes("+") || date.includes("-", 10)) {
    targetDate = new Date(date);
  } else {
    targetDate = new Date(`${date}Z`);
  }

  if (Number.isNaN(targetDate.getTime())) {
    return "";
  }

  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();

  if (diffMs < 0) {
    return buildDateString(targetDate);
  }

  if (diffMs < MS_IN_MINUTE) {
    return "지금";
  }

  if (diffMs < MS_IN_HOUR) {
    const minutesAgo = Math.max(1, Math.floor(diffMs / MS_IN_MINUTE));
    return `${minutesAgo}분 전`;
  }

  if (diffMs < MS_IN_DAY) {
    const hoursAgo = Math.floor(diffMs / MS_IN_HOUR);
    return `${hoursAgo}시간 전`;
  }

  const diffDays = Math.floor(diffMs / MS_IN_DAY);
  if (diffDays === 1) {
    return "어제";
  }

  return buildDateString(targetDate);
};

const buildDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default formatDate;
