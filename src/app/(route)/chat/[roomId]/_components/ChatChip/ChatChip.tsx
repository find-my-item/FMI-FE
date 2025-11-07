import { cn } from "@/utils";
import { CHAT_CHIP_MODE } from "./CHAT_CHIP_MODE";

const ChatChip = ({ postMode }: { postMode: "find" | "lost" }) => {
  return (
    <span
      role="note"
      className={cn(
        "h-[18px] w-[40px] shrink-0 rounded text-caption2-semibold flex-center",
        CHAT_CHIP_MODE[postMode].style
      )}
    >
      {CHAT_CHIP_MODE[postMode].text}
    </span>
  );
};

export default ChatChip;
