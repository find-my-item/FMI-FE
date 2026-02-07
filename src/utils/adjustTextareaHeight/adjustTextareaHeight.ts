const MAX_TEXTAREA_HEIGHT_PX = 120;

/**
 * textarea의 높이를 내용에 맞게 자동 조절합니다.
 * 최대 높이(120px)를 넘으면 스크롤되도록 overflow를 설정합니다.
 */
export const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto";
  const newHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT_PX);
  textarea.style.height = `${newHeight}px`;
  textarea.style.overflowY = "hidden";
};
