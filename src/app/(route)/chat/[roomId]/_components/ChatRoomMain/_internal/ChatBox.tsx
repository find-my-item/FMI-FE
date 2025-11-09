import { cn } from "@/utils";
import { MockChatDataType, Sender } from "../../../MockChatDataType";
import { CHAT_SENDER_STYLE } from "../_constants/CHAT_SENDER_STYLE";
import ChatImageBox from "./ChatImageBox";

interface ChatBoxProps {
  chat: MockChatDataType;
  nextSender?: Sender;
  lastChat?: boolean;
}

const ChatBox = ({ chat, nextSender, lastChat }: ChatBoxProps) => {
  const { sender, text, time, images } = chat;

  const marginBottom = lastChat ? "mb-0" : nextSender === sender ? "mb-2" : "mb-4";

  const style = CHAT_SENDER_STYLE[sender];
  return (
    <div className={cn("flex items-end gap-2", style.container, marginBottom)}>
      <time className={cn("text-caption1-medium text-layout-body-default", style.timeOrder)}>
        {time}
      </time>
      {text?.trim() && (
        <p
          className={cn(
            "max-w-[272px] whitespace-pre-wrap break-words rounded-[24px] px-[16px] py-[12px]",
            style.bubbleColor,
            style.bubbleOrder
          )}
        >
          {text}
        </p>
      )}
      <ChatImageBox images={images} bubbleOrder={style.bubbleOrder} />
    </div>
  );
};

export default ChatBox;
