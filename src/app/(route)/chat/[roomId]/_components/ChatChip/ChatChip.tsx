import { cn } from "@/utils";

const ChatChip = ({ mode }: { mode: "find" | "lost" }) => {
  const CHAT_CHIP_MODE = {
    find: { style: "text-accent-foundItem bg-fill-accent-fountItem", text: "습득물" },
    lost: { style: "text-accent-lostItem bg-fill-accent-lostItem", text: "분실물" },
  };

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
