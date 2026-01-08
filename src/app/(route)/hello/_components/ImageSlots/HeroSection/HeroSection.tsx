import Image from "next/image";
import "./HeroSection.css";

interface HeroSectionImage {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

const HeroSection = () => {
  return (
    <div className="relative min-h-[225px] w-full flex-center">
      <div className="animate-fade-in-float absolute right-[250px]">
        <HeroSectionImage src="/hello/hero/service-hero-wallet.svg" width={120} height={57} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="relative flex-center">
          <div className="animate-float-hero-y absolute bottom-[50px]">
            <HeroSectionImage src="/hello/hero/service-hero-location.svg" width={94} height={131} />
          </div>
          <HeroSectionImage src="/hello/hero/service-hero-bottom.svg" width={190} height={72} />
        </div>
      </div>

      <div className="animate-fade-in-float absolute left-[220px] top-[20px]">
        <HeroSectionImage src="/hello/hero/service-hero-phone.svg" width={80} height={57} />
      </div>
      <div className="animate-fade-in-float absolute left-[250px] top-[130px]">
        <HeroSectionImage src="/hello/hero/service-hero-bag.svg" width={80} height={57} />
      </div>
    </div>
  );
};

export default HeroSection;

const HeroSectionImage = ({ src, alt = "", width, height }: HeroSectionImage) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      draggable={false}
      className="select-none"
      priority
    />
  );
};
