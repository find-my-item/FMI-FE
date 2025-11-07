import { Icon } from "@/components";
import { Props } from "@/components/Icon/Icon";

const EmptyChatRoom = ({ postMode }: { postMode: "find" | "lost" }) => {
  const EMPTY_MODE_STYLE = {
    lost: {
      iconName: "ChatLost" as Props["name"],
      helpText: ["이 분실물을 주우셨나요?", "주인에게 먼저 연락해보세요."],
    },
    find: {
      iconName: "ChatFind" as Props["name"],
      helpText: ["내 물건이 맞는지 확인해보세요.", "습득자에게 메시지를 보내세요."],
    },
  };

  return (
    <section className="flex-1 bg-flatGray-25 flex-center">
      <h1 className="sr-only">빈 채팅 안내 화면</h1>
      <div className="gap-2 flex-col-center">
        <Icon name={EMPTY_MODE_STYLE[postMode].iconName} size={80} />
        <div className="select-none text-center text-body2-medium text-layout-body-default">
          {EMPTY_MODE_STYLE[postMode].helpText.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmptyChatRoom;
