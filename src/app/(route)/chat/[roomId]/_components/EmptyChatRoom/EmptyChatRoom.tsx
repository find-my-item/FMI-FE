import { Icon } from "@/components/common";
import { EMPTY_MODE_STYLE } from "./EMPTY_MODE_STYLE";

const EmptyChatRoom = ({ postMode }: { postMode: "find" | "lost" }) => {
  return (
    <section className="flex-1 bg-flatGray-25 flex-center">
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
