import Image from "next/image";
import {
  PHONE,
  CHAT_ITEMS,
  CHAT_STACK_LEFT,
  CHAT_LAST,
  SIDE_MESSAGES,
} from "./THIRD_SECTION_PARTS";

const ImagePart = ({
  src,
  width,
  height,
  className,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
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
    />
  );
};

const ThirdSection = () => {
  return (
    <div className="w-full flex-center">
      <div className="relative">
        <Image
          src={PHONE.src}
          alt=""
          aria-hidden
          width={PHONE.width}
          height={PHONE.height}
          draggable={false}
          className="relative z-10"
        />

        <div className="absolute inset-x-0 top-[calc(50%+30px)] z-20 flex w-full -translate-y-1/2 flex-col px-[14px]">
          {CHAT_ITEMS.map((item) => (
            <ImagePart key={item.src} {...item} />
          ))}

          <div className="mt-[7px] flex flex-col items-start gap-[3px]">
            {CHAT_STACK_LEFT.map((item) => (
              <ImagePart key={item.src} {...item} />
            ))}
          </div>

          <ImagePart {...CHAT_LAST} />
        </div>

        {SIDE_MESSAGES.map((message) => (
          <ImagePart key={message.src} {...message} />
        ))}
      </div>
    </div>
  );
};

export default ThirdSection;
