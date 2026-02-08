import { formatKoreanDate } from "@/utils";
import { formatChatTime } from "@/utils";

const formatDateWithTime = (isoString: string): string => {
  const datePart = formatKoreanDate(isoString).replace(" ", ". ");
  const timePart = formatChatTime(isoString);
  return `${datePart} ${timePart}`;
};

export default formatDateWithTime;
