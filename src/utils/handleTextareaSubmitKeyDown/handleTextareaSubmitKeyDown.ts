import { KeyboardEvent, RefObject } from "react";

/**
 * textarea에서 Enter(Shift 없음) 시 폼 제출을 요청하고 textarea 높이를 초기화합니다.
 * 채팅/댓글 입력 등 한 줄 Enter로 전송하는 UI에서 사용합니다.
 */
export const handleTextareaSubmitKeyDown = (
  e: KeyboardEvent<HTMLTextAreaElement>,
  textareaRef: RefObject<HTMLTextAreaElement | null>
) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
    const el = textareaRef.current ?? null;
    if (el) el.style.height = "auto";
  }
};
