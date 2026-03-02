import { RequiredText } from "@/components/common";
import { useFormContext, useWatch } from "react-hook-form";

const TitleInput = () => {
  const { register, control } = useFormContext();
  const titleValue = useWatch({ control, name: "title" });

  return (
    <section className="relative flex items-center border-y border-divider-default px-5 py-6">
      <input
        type="text"
        placeholder="제목을 입력해 주세요."
        className="w-full pr-10 text-body1-medium placeholder:text-neutral-normal-placeholder"
        maxLength={50}
        {...register("title", { required: true })}
      />
      {!titleValue && <RequiredText className="absolute left-[155px]" />}
      <span className="absolute right-5 text-body2-regular text-neutral-normal-placeholder">
        {titleValue?.length || 0}/50
      </span>
    </section>
  );
};

export default TitleInput;
