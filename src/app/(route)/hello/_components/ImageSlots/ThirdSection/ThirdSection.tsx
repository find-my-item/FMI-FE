import { CSSProperties } from "react";
import Image from "next/image";
import {
  PHONE,
  CHAT_ITEMS,
  CHAT_STACK_LEFT,
  CHAT_LAST,
  SIDE_MESSAGES,
} from "./THIRD_SECTION_PARTS";
import "./ThirdSection.css";

const ImagePart = ({
  src,
  width,
  height,
  className,
  style,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={width}
      height={height}
      draggable={false}
      className={className}
      style={style}
    />
  );
};

const ThirdSection = () => {
  return (
    <div className="w-full select-none flex-center">
      <div className="relative">
        <Image
          src={PHONE.src}
          alt=""
          aria-hidden
          width={PHONE.width}
          height={PHONE.height}
          draggable={false}
          className="relative z-10 h-[270px] w-[200px]"
        />

        <div className="absolute inset-x-0 top-[calc(50%+30px)] z-20 flex w-full -translate-y-1/2 flex-col px-[14px]">
          {CHAT_ITEMS.map((item) => (
            <ImagePart key={item.src} {...item} />
          ))}

          <div className="mt-[7px] flex flex-col items-start gap-[3px]">
            {CHAT_STACK_LEFT.map((item, index) => (
              <ImagePart
                key={item.src}
                {...item}
                className="chat-animate"
                style={{
                  animationDelay: `${index * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* TODO(지권): 이모지 깨짐 현상 수정 필요 */}
          <ImagePart
            {...CHAT_LAST}
            style={{
              animationDelay: "1.3s",
            }}
          />
        </div>

        {SIDE_MESSAGES.map((message) => (
          <ImagePart key={message.src} {...message} />
        ))}
      </div>
    </div>
  );
};

export default ThirdSection;
