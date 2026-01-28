import { cn, formatChatTime } from "@/utils";
import { CHAT_SENDER_STYLE } from "../../constants/CHAT_SENDER_STYLE";
import ChatImageBox from "../ChatImageBox/ChatImageBox";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import { useGetUserData } from "@/api/fetch/user";

interface ChatBoxProps {
  chat: ChatMessage;
  nextSender?: "me" | "other";
  lastChat?: boolean;
  opponentNickname?: string;
}

const ChatBox = ({ chat, nextSender, lastChat, opponentNickname }: ChatBoxProps) => {
  const { content, createdAt, imageUrls, messageType, senderId } = chat;
  const { data: userInfo } = useGetUserData();

  const sender = Number(userInfo?.result.userId) === senderId ? "me" : "other";
  const marginBottom = lastChat ? "mb-0" : nextSender === sender ? "mb-2" : "mb-4";

  const style = CHAT_SENDER_STYLE[sender];
  return (
    <div className={cn("flex items-end gap-2", style.container, marginBottom)}>
      <time className={cn("text-caption1-medium text-layout-body-default", style.timeOrder)}>
        {formatChatTime(createdAt)}
      </time>
      {messageType === "TEXT" && (
        <p
          className={cn(
            "max-w-[272px] whitespace-pre-wrap break-words rounded-[24px] px-4 py-3",
            style.bubbleColor,
            style.bubbleOrder
          )}
        >
          {content}
        </p>
      )}
      {messageType === "IMAGE" && (
        <ChatImageBox
          images={imageUrls}
          createdAt={createdAt}
          bubbleOrder={style.bubbleOrder}
          opponentNickname={opponentNickname}
        />
      )}
    </div>
  );
};

export default ChatBox;
