import { cn } from "@/utils";
import Image from "next/image";

interface FeatureSectionContent {
  imgUrl: string;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  content: FeatureSectionContent;
  variant?: boolean;
}

const FeatureSection = ({ content, variant = false }: FeatureSectionProps) => {
  const { imgUrl, title, description } = content;

  return (
    <section className={cn("px-10 py-[30px] flex-col-center", variant && "bg-[#EFFFF9]")}>
      <Image
        src={imgUrl}
        alt=""
        width={310}
        height={310}
        draggable={false}
        className="select-none"
      />
      <div className="mt-10 gap-5 text-center flex-col-center">
        <h2 className="text-h1-bold text-layout-header-default">{title}</h2>
        <p className="text-body1-regular text-layout-body-default">{description}</p>
      </div>
    </section>
  );
};

export default FeatureSection;
