import { ReactNode } from "react";
import { cn } from "@/utils";
import Image from "next/image";

interface FeatureSectionContent {
  imgUrl: string;
  title: string;
  description: string;
}

interface ImageSize {
  width?: number;
  height?: number;
}

interface FeatureSectionProps {
  content: FeatureSectionContent;
  variant?: "default" | "highlight";
  className?: string;
  imageSize?: ImageSize;
  imageSlot?: ReactNode;
}

const FeatureSection = ({
  content,
  variant = "default",
  className,
  imageSize = { width: 310, height: 310 },
  imageSlot,
}: FeatureSectionProps) => {
  const { imgUrl, title, description } = content;

  return (
    <section
      aria-labelledby={`service-introduce-${title}-title`}
      className={cn(
        "px-10 py-[60px] flex-col-center",
        // TODO(지권): 배경 색 수정 예정
        variant === "highlight" && "bg-[#EFFFF9]",
        className
      )}
    >
      {imageSlot ?? (
        <Image
          src={imgUrl}
          alt={title}
          width={imageSize.width}
          height={imageSize.height}
          draggable={false}
          className="select-none"
          priority
        />
      )}
      <div className="mt-10 gap-5 text-center flex-col-center">
        <h2 className="text-h1-bold text-layout-header-default">{title}</h2>
        <p className="text-body1-regular text-layout-body-default">{description}</p>
      </div>
    </section>
  );
};

export default FeatureSection;
