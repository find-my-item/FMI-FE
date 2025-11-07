import { Icon } from "@/components";

const EmptyChatRoom = () => {
  return (
    <section className="flex-1 bg-flatGray-25 flex-center">
      <h1 className="sr-only">빈 채팅 안내 화면</h1>
      <div className="gap-2 flex-col-center">
        <Icon name="Chat" size={80} />
        <div className="select-none text-center text-body2-medium text-layout-body-default">
          <p>이 분실물을 주우셨나요?</p>
          <p>주인에게 먼저 연락해보세요.</p>
        </div>
      </div>
    </section>
  );
};

export default EmptyChatRoom;
