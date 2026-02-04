import { cn } from "@/utils";
import { CHAT_CHIP_MODE, ChatChipMode } from "./CHAT_CHIP_MODE";
import { PostType } from "@/types";

interface ChatChipProps {
  postMode: PostType;
}

const ChatChip = ({ postMode }: ChatChipProps) => {
  const chipMode: ChatChipMode = postMode === "FOUND" ? "FIND" : "LOST";
  const chipConfig = CHAT_CHIP_MODE[chipMode];

  return (
    <span
      role="note"
      className={cn(
        "h-[18px] w-10 shrink-0 rounded text-caption2-semibold flex-center",
        chipConfig.style
      )}
    >
      {chipConfig.text}
    </span>
  );
};

export default ChatChip;
