import { cn } from "@/utils";
import { CHAT_CHIP_MODE } from "./CHAT_CHIP_MODE";

const ChatChip = ({ mode }: { mode: "find" | "lost" }) => {
  return (
    <span
      role="note"
      className={cn(
        "h-[18px] w-[40px] rounded text-caption2-semibold flex-center",
        CHAT_CHIP_MODE[mode].style
      )}
    >
      {CHAT_CHIP_MODE[mode].text}
    </span>
  );
};

export default ChatChip;
