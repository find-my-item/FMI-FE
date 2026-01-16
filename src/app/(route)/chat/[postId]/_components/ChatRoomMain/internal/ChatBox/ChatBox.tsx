import { cn, formatDate } from "@/utils";
import { Sender } from "@/app/(route)/chat/_types/Sender";
import { CHAT_SENDER_STYLE } from "../../constants/CHAT_SENDER_STYLE";
import ChatImageBox from "../ChatImageBox/ChatImageBox";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import useAppQuery from "@/api/_base/query/useAppQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

interface ChatBoxProps {
  chat: ChatMessage;
  nextSender?: Sender;
  lastChat?: boolean;
}

interface UserInfoResponse {
  userId: number;
  nickname: string;
  email: string;
  emailVerified: boolean;
  profileImg: string;
}

const ChatBox = ({ chat, nextSender, lastChat }: ChatBoxProps) => {
  const { content, createdAt, imageUrls, messageType, senderId } = chat;
  const { data: userInfo } = useAppQuery<ApiBaseResponseType<UserInfoResponse>>(
    "auth",
    ["userInfo"],
    `/users/me`
  );

  const sender = userInfo?.result.userId === senderId ? "me" : "other";
  const marginBottom = lastChat ? "mb-0" : nextSender === sender ? "mb-2" : "mb-4";

  const style = CHAT_SENDER_STYLE[sender];
  return (
    <div className={cn("flex items-end gap-2", style.container, marginBottom)}>
      <time className={cn("text-caption1-medium text-layout-body-default", style.timeOrder)}>
        {formatDate(createdAt)}
      </time>
      {messageType === "TEXT" && (
        <p
          className={cn(
            "max-w-[272px] whitespace-pre-wrap break-words rounded-[24px] px-[16px] py-[12px]",
            style.bubbleColor,
            style.bubbleOrder
          )}
        >
          {content}
        </p>
      )}
      {messageType === "IMAGE" && (
        <ChatImageBox images={imageUrls} createdAt={createdAt} bubbleOrder={style.bubbleOrder} />
      )}
    </div>
  );
};

export default ChatBox;
