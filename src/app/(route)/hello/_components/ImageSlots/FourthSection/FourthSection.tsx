import Image from "next/image";
import "./FourthSection.css";

const FourthSection = () => {
  return (
    <div className="select-none flex-col-center">
      <Image
        src="/hello/fourth/service-fourth-01.svg"
        alt=""
        width={318}
        height={86}
        draggable={false}
        className="fade-in h-[86px] w-[318px]"
      />
      <Image
        src="/hello/fourth/service-fourth-02.svg"
        alt=""
        width={280}
        height={75}
        priority
        draggable={false}
        className="h-[75px] w-[280px]"
      />
    </div>
  );
};

export default FourthSection;
