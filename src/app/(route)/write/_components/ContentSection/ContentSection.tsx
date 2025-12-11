import { RequiredText } from "@/components";
import { cn } from "@/utils";

const ContentSection = () => {
  return (
    <section className="min-h-[248px] border-b border-flatGray-50 px-5 py-6">
      <div className="relative">
        <textarea
          required
          id="content"
          name="content"
          maxLength={500}
          rows={5}
          placeholder=" "
          className={cn(
            "hide-scrollbar w-full resize-none py-6 text-body1-medium text-neutral-strong-default",
            "placeholder:text-body2-regular placeholder:text-neutral-normal-placeholder focus:outline-none"
          )}
        />
        <div className="pointer-events-none absolute left-1 top-1">
          <p className="text-body1-medium text-flatGray-400">
            내용을 입력해 주세요. <RequiredText />
          </p>

          <p className="mt-7 text-body2-regular text-neutral-normal-placeholder">
            분실/습득 날짜, 물건 종류, 물건의 특징 등 유실물 찾기에 도움이 되는 내용을 작성해
            주세요. <br />
            저작권과 관련된 내용은 반드시 출처를 표기해야 하며, 의심스러운 글을 작성할 경우 제재
            조치를 받을 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
