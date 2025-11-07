import { RequiredText } from "@/components";
import { cn } from "@/utils";

const ContentSection = () => {
  return (
    <section className="min-h-[248px] border-b border-flatGray-50 px-5 py-6" aria-label="내용 입력">
      <label htmlFor="content" className="text-body1-medium text-flatGray-400">
        내용을 입력해 주세요. <RequiredText />
      </label>
      <textarea
        name="content"
        id="content"
        placeholder="분실/습득 날짜, 물건 종류, 물건의 특징 등 유실물 찾기에 도움이 되는 내용을 작성해 주세요."
        className={cn(
          "w-full resize-none py-6 text-body1-medium text-neutral-strong-default",
          "placeholder:text-body2-regular placeholder:text-neutral-normal-placeholder focus:outline-none"
        )}
        rows={3}
        required
      />
    </section>
  );
};

export default ContentSection;
