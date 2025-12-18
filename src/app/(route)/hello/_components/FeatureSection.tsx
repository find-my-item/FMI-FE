import Image from "next/image";

interface FeatureSectionProps {
  imgUrl: string;
  title: string;
  description: string;
}

const FeatureSection = ({ imgUrl, title, description }: FeatureSectionProps) => {
  return (
    <section className="mx-10 my-[30px] flex-col-center">
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
