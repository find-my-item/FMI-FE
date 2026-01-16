import { cn } from "@/utils";
import { RequiredText } from "@/components/common";
import { useFormContext } from "react-hook-form";
import { PostWriteFormValues } from "../../_types/PostWriteType";

const TitleSection = () => {
  const { register } = useFormContext<PostWriteFormValues>();

  return (
    <section className="relative flex items-center justify-between border-b border-flatGray-50 px-5 py-6">
      <div className="relative w-full">
        <input
          type="text"
          id="title"
          placeholder="제목을 입력해 주세요."
          className="peer w-full bg-transparent text-body1-medium text-neutral-normal-default placeholder-transparent outline-none placeholder:text-flatGray-400"
          {...register("title", {
            required: "제목을 입력해 주세요.",
            maxLength: {
              value: 50,
              message: "제목은 50자 이내로 입력해 주세요.",
            },
          })}
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
