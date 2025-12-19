import Image from "next/image";

const HeroSection = () => {
  return (
    <div>
      <Image
        src="/hello/service-01.svg"
        alt="분실물 찾기, 더 쉽고 빠르게"
        width={310}
        height={310}
        draggable={false}
        className="select-none"
        priority
      />
    </div>
  );
};

export default HeroSection;
