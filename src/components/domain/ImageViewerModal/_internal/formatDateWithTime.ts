import { formatKoreanDate } from "@/app/(route)/chat/[postId]/_components/ChatRoomMain/internal/ChatDateDivider";
import { formatChatTime } from "@/utils";

const formatDateWithTime = (isoString: string): string => {
  const datePart = formatKoreanDate(isoString).replace(" ", ". ");
  const timePart = formatChatTime(isoString);
  return `${datePart} ${timePart}`;
};

export default formatDateWithTime;
