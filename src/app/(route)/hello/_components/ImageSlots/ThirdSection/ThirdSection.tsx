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
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex-col-center">
            <Image
              src="/hello/third/service-inner-parts-01.svg"
              alt=""
              width={50}
              height={50}
              draggable={false}
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
