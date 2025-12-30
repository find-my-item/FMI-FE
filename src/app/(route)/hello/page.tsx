import { CTASection, FeatureSection } from "./_components";
import { FEATURES } from "./_constants/FEATURES";

const page = () => {
  return (
    <section className="min-h-[100dvh] flex-col-center">
      {FEATURES.map((props, index) => (
        <FeatureSection key={index} {...props} />
      ))}

      <CTASection />
    </section>
  );
};

export default page;
