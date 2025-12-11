import { cn } from "@/utils";
import { RequiredText } from "@/components";

const TitleSection = () => {
  return (
    <section className="relative flex items-center justify-between border-b border-flatGray-50 px-5 py-6">
      <div className="relative w-full">
        <input
          type="text"
          required
          id="title"
          name="title"
          placeholder="제목을 입력해 주세요."
          maxLength={50}
          className="peer w-full bg-transparent text-body1-medium text-neutral-normal-default placeholder-transparent outline-none placeholder:text-flatGray-400"
        />
        <span
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2",
            "pointer-events-none text-body1-medium text-neutral-normal-placeholder",
            "peer-placeholder-shown:opacity-100 peer-[&:not(:placeholder-shown)]:opacity-0"
          )}
        >
          제목을 입력해 주세요. <RequiredText />
        </span>
      </div>
    </section>
  );
};

export default TitleSection;
