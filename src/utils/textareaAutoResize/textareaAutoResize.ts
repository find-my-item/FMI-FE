export const textareaAutoResize = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto";
  const newHeight = Math.min(textarea.scrollHeight, 120);
  textarea.style.height = `${newHeight}px`;
  textarea.style.overflowY = "hidden";
};
