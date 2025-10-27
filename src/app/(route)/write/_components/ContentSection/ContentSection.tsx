import RequiredText from "@/components/RequiredText/RequiredText";
import { cn } from "@/utils/cn";

const ContentSection = () => {
  return (
    <section className="min-h-[248px] border-b border-[#E4E4E4] px-5 py-6" aria-label="내용 입력">
      <label htmlFor="content" className="leading-[150%] text-[#9D9D9D]">
        내용을 입력해 주세요. <RequiredText />
      </label>
      <textarea
        name="content"
        id="content"
        placeholder="분실/습득 날짜, 물건 종류, 물건의 특징 등 유실물 찾기에 도움이 되는 내용을 작성해 주세요."
        className={cn(
          "w-full resize-none py-6 text-[16px] leading-[150%] text-[#5D5D5D]",
          "placeholder:text-[14px] placeholder:leading-[140%] placeholder:text-[#9D9D9D] focus:outline-none"
        )}
        rows={3}
        required
      />
    </section>
  );
};

export default ContentSection;
