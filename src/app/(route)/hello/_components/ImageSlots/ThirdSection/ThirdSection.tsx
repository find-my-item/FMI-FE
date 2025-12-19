import Image from "next/image";

const ThirdSection = () => {
  return (
    <div className="w-full flex-center">
      <div className="relative">
        <Image
          src="/hello/third/service-phone-layout.svg"
          alt=""
          width={200}
          height={270}
          draggable={false}
          className="relative z-10"
        />

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
