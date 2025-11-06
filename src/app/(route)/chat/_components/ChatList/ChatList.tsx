import ChatItem from "../ChatItem/ChatItem";

const ChatList = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <ChatItem key={index} />
      ))}
    </>
  );
};

export default ChatList;
