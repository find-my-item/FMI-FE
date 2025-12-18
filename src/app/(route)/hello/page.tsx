import { CTASection, FeatureSection } from "./_components";
import { FEATURES } from "./_constants/FEATURES";

const page = () => {
  return (
    <div className="min-h-[100dvh] flex-col-center">
      {FEATURES.map((props, index) => (
        <FeatureSection key={index} {...props} />
      ))}

      <CTASection />
    </div>
  );
};

export default page;
