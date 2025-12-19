import Image from "next/image";

const ThirdSection = () => {
  return (
    <div className="w-full flex-center">
      <div className="relative">
        <div className="relative">
          <Image
            src="/hello/third/service-phone-layout.svg"
            alt=""
            width={200}
            height={270}
            draggable={false}
            className="relative z-10"
          />
          <div className="absolute inset-x-0 top-[calc(50%+30px)] z-20 flex w-full -translate-y-1/2 flex-col px-[14px]">
            <Image
              src="/hello/third/service-inner-parts-01.svg"
              alt=""
              width={50}
              height={50}
              draggable={false}
              className="self-center"
            />
            <Image
              src="/hello/third/service-inner-parts-02.svg"
              alt=""
              width={145}
              height={38}
              draggable={false}
              className="mt-[7px] self-end"
            />
            <div className="mt-[7px] flex flex-col items-start gap-[3px]">
              <Image
                src="/hello/third/service-inner-parts-03.svg"
                alt=""
                width={44}
                height={20}
                draggable={false}
              />
              <Image
                src="/hello/third/service-inner-parts-04.svg"
                alt=""
                width={126}
                height={38}
                draggable={false}
              />
              <Image
                src="/hello/third/service-inner-parts-05.svg"
                alt=""
                width={68}
                height={20}
                draggable={false}
              />
            </div>
            <Image
              src="/hello/third/service-inner-parts-06.svg"
              alt=""
              width={145}
              height={38}
              draggable={false}
              className="mt-[7px] self-end"
            />
          </div>
        </div>

        <Image
          src="/hello/third/service-left-message.svg"
          alt=""
          width={50}
          height={50}
          draggable={false}
          className="absolute bottom-[16px] left-[-42px]"
        />

        <Image
          src="/hello/third/service-right-message.svg"
          alt=""
          width={56}
          height={56}
          draggable={false}
          className="absolute right-[-40px] top-[100px]"
        />
      </div>
    </div>
  );
};

export default ThirdSection;
