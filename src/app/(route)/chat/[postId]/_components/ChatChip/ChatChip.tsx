import { cn } from "@/utils";
import { CHAT_CHIP_MODE, ChatChipMode } from "./CHAT_CHIP_MODE";

interface ChatChipProps {
  postMode: "FOUND" | "LOST";
}

const ChatChip = ({ postMode }: ChatChipProps) => {
  const chipMode: ChatChipMode = postMode === "FOUND" ? "FIND" : "LOST";
  const chipConfig = CHAT_CHIP_MODE[chipMode];

  return (
    <span
      role="note"
      className={cn(
        "h-[18px] w-[40px] shrink-0 rounded text-caption2-semibold flex-center",
        chipConfig.style
      )}
    >
      {chipConfig.text}
    </span>
  );
};

export default ChatChip;
