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
