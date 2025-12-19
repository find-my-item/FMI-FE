import Image from "next/image";
import "./SecondSection.css";
import { cn } from "@/utils";
import { IMAGES } from "./SECOND_SECTION_IMAGES";

const SecondSection = () => {
  return (
    <div className="relative w-fit">
      <Image
        src="/hello/second/service-second-layout.svg"
        alt=""
        width={196}
        height={405}
        draggable={false}
        className="relative z-10 select-none"
        priority
      />

      {IMAGES.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt=""
          width={178}
          height={405}
          draggable={false}
          priority={index === 0}
          className={cn(
            "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 select-none",
            index === 0 ? "fade-out-once" : "fade-in-once"
          )}
        />
      ))}
    </div>
  );
};

export default SecondSection;
