import { cn } from "@/utils";

/**
 * @author jikwon
 *
 * @description
 * 스낵바 컴포넌트입니다.
 *
 * @param message - 스낵바에 표시될 메시지
 * @param actionLabel - 버튼 텍스트(액션 사용 시 필수)
 * @param actionHandler - 버튼 클릭 핸들러(액션 사용 시 필수)
 * @param className - 스낵바에 적용될 클래스
 *
 * @example
 * ```tsx
 * <SnackBar
 *   message="유저를 차단했어요"
 *   actionLabel="차단 목록으로 이동"
 *   actionHandler={() => {}}
 * />
 * ```
 */

interface SnackBarProps {
  message: string;
  actionLabel?: string;
  actionHandler?: () => void;
  className?: string;
}

const SnackBar = ({ message, actionLabel, actionHandler, className }: SnackBarProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-24 left-1/2 z-[9999] -translate-x-1/2",
        "w-[calc(100%-2rem)] max-w-[767px]",
        "flex items-center justify-between rounded-[8px] bg-toast px-5 py-3",
        "tablet:max-w-[736px]",
        className
      )}
    >
      <p className="text-body1-medium text-neutralInversed-normal-enteredSelected">{message}</p>
      {actionLabel && actionHandler && (
        <button
          type="button"
          onClick={actionHandler}
          className="text-body1-semibold text-system-toastSuccess"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default SnackBar;
