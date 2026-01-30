import { cn } from "@/utils";

interface ReplyFormProps {
  isThreadItem: boolean;
}

const ReplyForm = ({ isThreadItem }: ReplyFormProps) => {
  return (
    <form action="" className="w-full">
      <input
        type="text"
        placeholder="답글 작성란"
        className={cn(
          "mt-2 w-full rounded-3xl px-4 py-[10px]",
          "placeholder:text-body1-medium placeholder:text-neutral-strong-placeholder",
          isThreadItem ? "bg-[#FFFFFF]" : "bg-[#F5F5F5]"
        )}
      />
    </form>
  );
};

export default ReplyForm;
