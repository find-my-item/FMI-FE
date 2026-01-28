import { formatKoreanDate } from "./formatKoreanDate";

interface ChatDateDividerProps {
  createdAt: string;
}

export const ChatDateDivider = ({ createdAt }: ChatDateDividerProps) => {
  return (
    <div className="mb-4 mt-4 flex w-full justify-center">
      <span className="rounded-3xl bg-toast px-2 py-1 text-caption2-semibold text-white">
        {formatKoreanDate(createdAt)}
      </span>
    </div>
  );
};
