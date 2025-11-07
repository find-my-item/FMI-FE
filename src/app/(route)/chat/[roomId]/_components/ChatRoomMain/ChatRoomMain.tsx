import ChatBox from "./_internal/ChatBox";
import { MOCK_CHAT_DATA } from "./_constants/MOCK_CHAT_DATA";

const ChatRoomMain = () => {
  return (
    <div className="flex-1 overflow-y-scroll bg-flatGray-25 px-[16px] py-[8px] no-scrollbar">
      <div className="mb-4 flex w-full justify-center">
        <span className="rounded-3xl bg-toast px-[8px] py-[4px] text-caption2-semibold text-white">
          2025.11.07 금요일
        </span>
      </div>
      {MOCK_CHAT_DATA.map((chat, i) => (
        <ChatBox
          key={i}
          chat={chat}
          prevSender={MOCK_CHAT_DATA[i - 1]?.sender}
          nextSender={MOCK_CHAT_DATA[i + 1]?.sender}
        />
      ))}
    </div>
  );
};

export default ChatRoomMain;
