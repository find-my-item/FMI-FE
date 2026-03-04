import { SupportFaqAccordion, SupportSearchForm, SupportTab } from "./_components";

const page = () => {
  return (
    <div className="space-y-[10px] h-base">
      <SupportSearchForm />
      <SupportTab />
      <SupportFaqAccordion />
    </div>
  );
};

export default page;
