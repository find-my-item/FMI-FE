import { KeyboardEvent, RefObject } from "react";

const clearHeight = (textareaRef: HTMLTextAreaElement | null) => {
  if (!textareaRef) return;
  textareaRef.style.height = "auto";
};

export const textareaSubmitKeyHandler = (
  e: KeyboardEvent<HTMLTextAreaElement>,
  textareaRef: RefObject<HTMLTextAreaElement | null>
) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
    clearHeight(textareaRef.current ?? null);
  }
};
