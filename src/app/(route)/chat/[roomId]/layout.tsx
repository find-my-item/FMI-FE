import { ChatRoomHeader } from "./_components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ChatRoomHeader />
      {children}
    </>
  );
};

export default layout;
